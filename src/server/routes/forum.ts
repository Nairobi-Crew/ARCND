/* eslint-disable no-tabs,no-await-in-loop,no-console */
import { Express } from 'express';
import {
  MessageCreationAttributes, MessageModel, TopicCreationAttributes, TopicModel,
} from 'Server/db/models/forum';
import { getUser, getUserById } from 'Server/db/users';
import { UserModel } from 'Server/db/models/user';
import { IMessagesItem, ITopicsItem } from 'Reducers/forum/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as sq from 'sequelize';
import { getDisplayName } from 'Store/util';
import { IUser } from 'Store/types';
import { cloneObject } from 'Util/cloneObject';
import { escapedString } from 'Util/escapedString';

const forumRoutes = (app: Express, json: any, url: string) => {
//   SELECT
  // 	t."id" as topic_id,
  // 	t.title as topic_title,
  // 	t."userId" as topic_user,
  // 	m.lastid as last_message_id,
  // 	m."date" as topic_date,
  // 	m.title AS message_title,
  // 	m.message AS message_message,
  // 	m."userId" AS message_user,
  // 	m."date" as message_date,
  // 	tu.first_name as topic_first_name,
  // 	tu.second_name as topic_second_name,
  // 	tu.display_name as topic_display_name,
  // 	tu.login as topic_login,
  // 	mu.first_name as message_first_name,
  // 	mu.second_name as message_second_name,
  // 	mu.display_name as message_display_name,
  // 	mu.login as message_login
  // FROM
  // 	topics AS "t"
  // 	LEFT JOIN
  // 	(
  // 		SELECT
  // 			recent."topicId",
  // 			"id" AS lastid,
  // 			recent."date",
  // 			messages.title,
  // 			messages.message,
  // 			messages."userId"
  // 		FROM
  // 			messages
  // 			INNER JOIN
  // 			(
  // 				SELECT
  // 					messages."topicId",
  // 					MAX(messages."date") AS "date"
  // 				FROM
  // 					messages
  // 				GROUP BY
  // 					1
  // 			) AS recent
  // 			ON
  // 				messages."topicId" = recent."topicId"
  // 		WHERE
  // 			messages."date" = recent."date"
  // 	) AS "m"
  // 	ON
  // 		t."id" = m."topicId"
  // 	INNER JOIN
  // 	users as tu
  // 	ON
  // 		t."userId" = tu."id"
  // 	INNER JOIN
  // 	users AS mu
  // 	ON
  // 		m."userId" = mu."id"

  app.get(`${url}/`, json, async (_req, res) => {
    TopicModel.findAll({
      attributes: ['id', 'title', 'date', 'userId', ['(select count(*) from messages where messages."topicId" = "id" group by messages."topicId")', 'count']],
    }).then(async (items) => {
      const topics: ITopicsItem[] = [];
      const obj = cloneObject(items);
      // eslint-disable-next-line no-restricted-syntax
      for (const item of obj) {
        const {
          id, title, count,
        } = item;
        const authorId = item.userId;
        let author: string = '';
        const createTime = new Date(item.date).getTime();
        try {
          const authorUser = cloneObject(await getUserById(_req, authorId)) as IUser;
          author = getDisplayName(authorUser, 'Unknown');
          console.log('Author', { authorId, author });
        } catch (e) {
          console.log('Error get user name by ID', authorId);
        }

        const subQuery = `(select max("date") from messages where "topicId"=${item.id})`;
        try {
          const lastMessageModel = await MessageModel.findOne({
            attributes: ['topicId', 'parent', 'userId', 'message', 'title', 'date'],
            where: {
              date: {
                [sq.Op.eq]: sq.literal(subQuery),
              },
            },
          });

          const lastMessage = cloneObject(lastMessageModel);
          if (lastMessage) {
            const lastMessageUserId = lastMessage?.userId;
            const lastMessageUser = await getUserById(_req, lastMessageUserId);
            const lastMessageUserName = getDisplayName(lastMessageUser);
            const lastMessageMessage = lastMessage?.message;

            topics.push({
              messageCount: count || 0,
              id,
              createTime,
              authorId,
              description: title,
              author,
              lastMessage: lastMessageMessage,
              lastMessageTime: new Date(lastMessage?.date as unknown as string).getTime(),
              lastMessageUserId,
              lastMessageUser: lastMessageUserName,
            });
          } else {
            topics.push({
              messageCount: count || 0,
              id,
              createTime,
              authorId,
              description: title,
              author,
              lastMessage: '',
              lastMessageTime: Date.now(),
              lastMessageUserId: 0,
              lastMessageUser: '',
            });
          }
        } catch (e) {
          console.log('Error get last message and put to array', e);
          //
        }
      }
      res.status(200).send(topics);
    }).catch((err) => res.status(500).send(err));
  });

  /**
   * Новый топик на форум
   */
  app.post(`${url}/`, json, async (req, res) => {
    let user : UserModel;
    const { body } = req;
    const title = escapedString(body.title ? body.title : '');
    try {
      const createTime = new Date(Date.now());
      user = cloneObject(await getUser(req));
      const newTopic : TopicCreationAttributes = {
        date: createTime,
        title,
        userId: user.id,
      };
      const topic = cloneObject(await TopicModel.create(newTopic));
      res.status(200).send({
        id: topic.id,
        description: title,
        authorId: user.id,
        author: getDisplayName(user, 'Unknown'),
        createTime: createTime.getTime(),
        lastMessageTime: '',
        lastMessage: '',
        lastMessageUserId: 0,
        lastMessageUser: '',
        messageCount: 0,
      });
    } catch (e) {
      res.status(401).send(e);
    }
  });

  /**
   * список сообщений из топика
   */
  app.get(`${url}/thread/:id`, json, async (req, res) => {
    const topicId = parseInt(req.params.id, 10) || 0;
    if (topicId === 0) {
      res.status(500).send({ reason: 'Error' });
      return;
    }

    try {
      const rawMessages = cloneObject(await MessageModel.findAll({
        where: {
          topicId,
        },
      }));
      const messages: IMessagesItem[] = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const message of rawMessages) {
        messages.push({
          id: parseInt(message.id, 10),
          topic: topicId,
          authorId: parseInt(message.userId, 10),
          parentMessage: parseInt(message.parent, 10),
          header: message.title,
          message: message.message,
          author: getDisplayName(cloneObject(await getUserById(req, message.userId)), 'Unknown'),
          time: new Date(message.date).getTime(),
          emoji: message.emoji,
        });
      }
      res.status(200).send(messages);
    } catch (e) {
      console.log(`Error fetch messages ${topicId}`, e);
      res.status(500).send(e);
    }
  });

  /**
   * Запись сообщения
   */
  app.post(`${url}/thread/:id`, json, async (req, res) => {
    const id = parseInt(req.params.id, 10) || 0;
    const date = new Date(Date.now());
    console.log('Body', req.body);
    const {
      message, parentMessage, topic, header, emoji,
    } = req.body;
    let user;
    try {
      user = cloneObject(await getUser(req));
    } catch (e) {
      console.log('Error check user');
      res.status(401).send({});
      return;
    }
    const msg: MessageCreationAttributes = {
      message: escapedString(message as string),
      topicId: topic,
      title: escapedString(header as string),
      userId: user.id,
      parent: parentMessage,
      emoji,
    };
    console.log('New message', msg);
    let newMessage;
    try {
      if (id === 0) {
        newMessage = cloneObject(await MessageModel.create({ ...msg, date }));
      } else {
        newMessage = cloneObject(await MessageModel.update(msg, {
          where: {
            id,
          },
        }));
      }
    } catch (e) {
      console.log('Error save message', e);
      res.status(500).send(e);
      return;
    }
    const answer: IMessagesItem = {
      id: parseInt(newMessage.id, 10),
      topic: parseInt(newMessage.topic, 10),
      message: newMessage.message,
      time: new Date(newMessage.date).getTime(),
      header: newMessage.title,
      parentMessage: parseInt(newMessage.parent, 10),
      authorId: parseInt(newMessage.userId, 10),
      author: getDisplayName(user, 'Unknown'),
      emoji: newMessage.emoji,
    };
    res.status(200).send(answer);
  });
};

export default forumRoutes;
