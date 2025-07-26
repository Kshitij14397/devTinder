const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedFields = ["ignored", "interested"];
      const isStatusAllowed = allowedFields.includes(status);

      if (!isStatusAllowed) {
        throw new Error(
          `${status} status not allowed while sending connection request`
        );
      }

      const isExistingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isExistingConnectionRequest) {
        return res.status(404).json({
          message: "Connection Request already exist!!!",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();

      const toUser = await User.findById(toUserId);

      res.json({
        message: `${req.user.firstName} ${
          status === "interested" ? "interested in" : "ignored"
        } ${toUser.firstName}`,
        data: connectionRequest,
      });
    } catch (err) {
      res.status(400).send("Something went wrong: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status is not allowed!!!");
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      await connectionRequest.save();

      res.json({ message: "Connection request " + status, connectionRequest });

      // Validate the status
      // Akshay -> Elon
      //loggedInId -> toUserId
      // status -> interested
      // requestId should be available in our database
    } catch (err) {
      res.status(400).send("Something went wrong: " + err.message);
    }
  }
);

module.exports = requestRouter;
