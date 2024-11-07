import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import {JokeFactory} from './likedJoke.js';

const User = UserFactory(sequelize);
const Joke = JokeFactory(sequelize);
User.hasMany(Joke, {foreignKey:'userID', onDelete:'CASCADE'});
Joke.belongsTo(User, {foreignKey:'userID'});

export { User, Joke };
