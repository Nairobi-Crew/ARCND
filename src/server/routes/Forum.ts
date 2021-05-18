import Routes from 'Server/routes/Routes';
import express, { Request, Response } from 'express';
import { FORUM_URL } from 'Config/config';
import { isLogged } from 'Server/middlewares/isLogged';
import { logger } from 'Server/middlewares/logger';
import {
  MessageCreationAttributes, MessageModel, TopicCreationAttributes, TopicModel,
} from 'Server/db/models/forum';
import { UserModel } from 'Server/db/models/user';
import { cloneObject } from 'Util/cloneObject';
import { EHttpStatusCodes } from 'Server/types';
import { IMessagesItem, ITopicsItem } from 'Reducers/forum/types';
import { getDisplayName } from 'Store/util';
import { bodyChecker } from 'Server/middlewares/bodyChecker';
import { escapedString } from 'Util/escapedString';
import Auth from 'Server/routes/Auth';
import { IUser } from 'Store/types';
import { toNumber } from 'Util/toNumber';

export default class Forum extends Routes {
  constructor(app: express.Application) {
    super(app, 'Forum');
  }

  configRoutes() {
    /**
     * Topic list
     */
    this.app.get(`${FORUM_URL}/`, [isLogged(), logger({ needParams: true })], async (_req: Request, res: Response) => {
      try {
        const topicsFromDb = await TopicModel.findAll({
          attributes: [
            'id',
            'title',
            'date',
            'userId',
            ['(select count(*) from messages where messages."topicId" = "TopicModel"."id" group by messages."topicId")', 'count'],
          ],
          include: [
            {
              model: UserModel,
              required: true,
            },
          ],
        });
        const topics: ITopicsItem[] = [];
        const list = cloneObject(topicsFromDb);
        // eslint-disable-next-line no-restricted-syntax
        for (const item of list) {
          const { user } = item;
          topics.push({
            id: item.id as number,
            author: getDisplayName(user),
            authorId: item.userId as number,
            description: escapedString(item.title),
            messageCount: item.count as number || 0,
            createTime: item.date as number,
          });
        }
        res.status(EHttpStatusCodes.OK).send(topics);
      } catch (e) {
        res.status(EHttpStatusCodes.BAD_REQUEST).send(e);
      }
    });

    /**
     * New topic
     */
    this.app.post(`${FORUM_URL}/`, [logger({ needBody: true }), isLogged(), bodyChecker()], async (req: Request, res: Response) => {
      try {
        const { title } = req.body;
        const user = await Auth.getUser(req);
        const createTime = new Date();
        const newTopic: TopicCreationAttributes = {
          date: createTime,
          title,
          userId: user?.id as number,
        };
        const topic = cloneObject(await TopicModel.create(newTopic));
        const answer: ITopicsItem = {
          id: topic.id as number,
          description: escapedString(topic.title),
          author: getDisplayName(user),
          authorId: user?.id as number,
          createTime: createTime.getTime(),
          messageCount: 0,
        };
        res.status(EHttpStatusCodes.OK).send(answer);
      } catch (e) {
        res.status(EHttpStatusCodes.FORBIDDEN).send(e);
      }
    });

    /**
     * Messages on topic
     */
    this.app.get(
      `${FORUM_URL}/thread/:id`,
      [
        logger({ needParams: true }),
        isLogged(),
      ],
      async (req: Request, res: Response) => {
        const topicId = parseInt(req.params.id, 10) || 0;
        if (topicId === 0) {
          res.status(EHttpStatusCodes.BAD_REQUEST).send({ reason: 'Error in parameters' });
        }
        try {
          const messagesDB = (await MessageModel.findAll({
            where: {
              topicId,
            },
            include: {
              model: UserModel,
              required: true,
            },
          }));
          const messages: IMessagesItem[] = [];
          messagesDB.forEach((d) => {
            const u = cloneObject(d).user;
            const message = d.get();
            const id = toNumber(message.id);
            const emoji = toNumber(message.emoji);
            const author = getDisplayName(u as IUser);
            const authorId = toNumber(message.userId);
            messages.push({
              id,
              author,
              authorId,
              emoji,
              topic: topicId,
              message: message.message ?? '',
              parentMessage: toNumber(message.parent),
              header: message.title ?? '',
              time: (message.date as Date).getTime(),
            });
          });
          res.status(EHttpStatusCodes.OK).send(messages);
        } catch (e) {
          res.status(EHttpStatusCodes.BAD_REQUEST).send(e);
        }
      },
    );

    this.app.post(`${FORUM_URL}/thread/:id`,
      [
        logger({ needBody: true, needParams: true }),
        isLogged(),
        bodyChecker(),
      ], async (req: Request, res: Response) => {
        let id;
        try {
          id = parseInt(req.params.id, 10) || 0;
        } catch (e) {
          id = 0;
        }
        const date = new Date();
        const {
          message,
          parentMessage,
          topic,
          header,
          emoji,
        } = req.body;
        try {
          const user = await Auth.getUser(req);
          const msg: MessageCreationAttributes = {
            message,
            topicId: topic,
            title: header,
            userId: user?.id,
            parent: parentMessage,
            emoji,
          };
          let newMessage;
          if (id === 0) {
            newMessage = cloneObject(await MessageModel.create({ ...msg, date }));
          } else {
            newMessage = cloneObject(await MessageModel.update(msg, {
              where: {
                id,
              },
            }));
          }
          const answer: IMessagesItem = {
            id: toNumber(newMessage.id),
            topic: toNumber(newMessage.topic),
            message: newMessage.message,
            time: new Date(newMessage.date).getTime(),
            header: newMessage.title,
            parentMessage: newMessage.parent,
            authorId: newMessage.userId,
            emoji: newMessage.emoji,
            author: getDisplayName(user),
          };
          res.status(EHttpStatusCodes.OK).send(answer);
        } catch (e) {
          res.status(EHttpStatusCodes.BAD_REQUEST).send(e);
        }
      });
    return this.app;
  }
}
