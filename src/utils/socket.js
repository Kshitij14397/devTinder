const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");

const getRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initSocket = (server) => {
  const io = socket(server, {
    cors: { origin: "http://localhost:5173" },
  });

  io.on("connection", (socket) => {
    // Handle Events
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getRoomId(userId, targetUserId);
      console.log(`${firstName} joined room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          // TODO: Check if userId and targetUserId are friends

          const roomId = getRoomId(userId, targetUserId);
          console.log(firstName + ": " + text);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({ senderId: userId, text });
          await chat.save();

          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
          });
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initSocket;
