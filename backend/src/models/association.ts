import Message from './message.model';
import Room from './room.model';
import User from './user.model';

// Define Associations
User.hasMany(Message, { foreignKey: 'userId', as: 'Messages' });
Message.belongsTo(User, { foreignKey: 'userId', as: 'Sender' });

Room.hasMany(Message, { foreignKey: 'roomId', as: 'Messages' });
Message.belongsTo(Room, { foreignKey: 'roomId', as: 'Room' });

export { User, Room, Message };