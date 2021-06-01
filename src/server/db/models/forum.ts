// eslint-disable-next-line max-classes-per-file
import {
  AutoIncrement, BelongsTo,
  Column,
  DataType,
  ForeignKey, HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import sequelize from 'Server/db/connection';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Optional } from 'sequelize';
import { syncUserModel, UserModel } from 'Server/db/models/user';
import { force_sync } from '../../../../env.variables';

export interface TopicAttributes {
  id?: number
  title?: string
  date?: Date
  userId?: number
}

export interface TopicCreationAttributes extends Optional<TopicAttributes, 'id'> {}

@Table({
  paranoid: false,
  timestamps: false,
  tableName: 'topics',
})
export class TopicModel extends Model<TopicAttributes, TopicCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number

  @Column({
    type: DataType.STRING(200),
  })
  title: string

  @Column({
    type: DataType.DATE,
  })
  date: Date

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.BIGINT,
  })
  userId: number

  @BelongsTo(() => UserModel)
  user: UserModel

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  @HasMany(() => MessageModel)
  messages: MessageModel
}

export interface MessageAttributes {
  id?: number
  topicId?: number
  parent?: number
  userId?: number
  date?: Date
  message?: string
  title?: string
  emoji?: number
}

export interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

@Table({
  paranoid: false,
  timestamps: false,
  tableName: 'messages',
})
export class MessageModel extends Model<MessageAttributes, MessageCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    field: 'id',
  })
  id: number

  @ForeignKey(() => TopicModel)
  @Column({
    type: DataType.BIGINT,
  })
  topicId: number

  @BelongsTo(() => TopicModel)
  topic: TopicModel

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  @Index
  parent: number

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.BIGINT,
  })
  userId: number

  @BelongsTo(() => UserModel)
  user: UserModel

  @Column({
    type: DataType.DATE,
  })
  @Index
  date: Date

  @Column({
    type: DataType.TEXT,
  })
  message: string

  @Column({
    type: DataType.STRING(200),
  })
  title: string

  @Column({
    type: DataType.SMALLINT,
  })
  emoji: number
}

export const syncTopicModel = (force: boolean): Promise<void> => new Promise((resolve, reject) => (
  TopicModel.sync({ force }).then(() => resolve()).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Error sync model TOPIC', error);
    reject();
  })));

export const syncMessageModel = (force: boolean): Promise<void> => new Promise((resolve, reject) => (
  MessageModel.sync({ force }).then(() => resolve()).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Error sync model MESSAGE', error);
    reject();
  })));

export const syncForumModels = (force: boolean) => new Promise<void>((resolve, reject) => {
  syncUserModel(force).then(() => {
    syncTopicModel(force).then(() => {
      syncMessageModel(force).then(() => resolve()).catch(() => reject());
    });
  });
});

sequelize.addModels([UserModel, TopicModel, MessageModel]);
TopicModel.hasMany(MessageModel);
MessageModel.belongsTo(TopicModel);
const forceSync = force_sync;
console.log(` ------------------------------ FORCE SYNC MODELS ${forceSync} ${process.env.FORCE_SYNC}------------------------------------------`);
syncForumModels(forceSync).then(() => {
}).catch(() => {
  // eslint-disable-next-line no-console
  console.log('Synchronization failed');
});
