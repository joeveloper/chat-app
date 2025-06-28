import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER, // Unique identifier for the message
      primaryKey: true, // This field is the primary key
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT, // The content of the message
      allowNull: false, // Content cannot be null
    },
    userId: {
      type: DataTypes.INTEGER, // Identifier for the user who sent the message
      allowNull: false, // User ID cannot be null
    },
    roomId: {
      type: DataTypes.INTEGER, // Identifier for the room where the message was sent
      allowNull: false, // Room ID cannot be null
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "messages", // Name of the model
    timestamps: false, // Disable automatic timestamps
  }
);

export default Message;
