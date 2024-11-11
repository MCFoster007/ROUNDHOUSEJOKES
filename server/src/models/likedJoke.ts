import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';
import {User} from './user.js';

interface JokeAttributes {
    id: number;
    jokeId: string;
    userID: number;
    text: string;
  }

  interface JokeCreationAttributes extends Optional<JokeAttributes, 'id'> {}

  export class Joke
  extends Model<JokeAttributes, JokeCreationAttributes>
  implements JokeAttributes
{
  public id!: number;
  public jokeId!: string;
  public userID!: number;
  public text!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
}

export function JokeFactory(sequelize: Sequelize): typeof Joke {
  Joke.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      jokeId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'id',

        },
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'likedjokes',
      sequelize,
    }
  );

  return Joke;
}