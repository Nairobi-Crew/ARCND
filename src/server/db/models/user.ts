import {
  Model, Table, Column, PrimaryKey, DataType,
} from 'sequelize-typescript';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Optional } from 'sequelize';

export interface UserAttributes {
  id?: number
  first_name?: string
  second_name?: string
  display_name?: string
  phone?: string
  email?: string
  login?: string
  OAUth?: string
  hash?: string
  avatar?: string
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  paranoid: false,
  timestamps: false,
  tableName: 'users',
})
export class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  // @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    field: 'id',
  })
  id: number

  @Column({
    type: DataType.STRING(100),
    field: 'first_name',
    defaultValue: '',
  })
  first_name: string

  @Column({
    type: DataType.STRING(100),
    field: 'second_name',
    defaultValue: '',
  })
  second_name: string

  @Column({
    type: DataType.STRING(100),
    defaultValue: '',
  })
  display_name: string

  @Column({
    type: DataType.STRING(20),
    defaultValue: '',
  })
  phone: string

  @Column({
    type: DataType.STRING(50),
    defaultValue: '',
  })
  email: string

  @Column({
    type: DataType.STRING(50),
    defaultValue: '',
  })
  login: string

  @Column({
    type: DataType.STRING(100),
    defaultValue: '',
  })
  OAuth: string

  @Column({
    type: DataType.STRING(200),
    defaultValue: '',
  })
  hash: string

  @Column({
    type: DataType.STRING(500),
    defaultValue: '',
  })
  avatar: string
}

export const syncUserModel = (
  force: boolean,
): Promise<void> => new Promise((resolve, reject) => (
  UserModel.sync({ force }).then(() => resolve()).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Error sync model USER', error);
    reject();
  })));
