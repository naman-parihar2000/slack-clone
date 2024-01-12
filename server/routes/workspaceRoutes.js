const express = require("express");
const router = express.Router();
const AWS = require("../utils/AWS.js");
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const authenticate = require("./authMiddleware.js");

router.post("/", authenticate, async (req, res) => {
  const { workspaceName, inviteEmails, photoUrl } = req.body;

  const newWorkspace = {
    name: workspaceName,
    id: `${req.user.googleId}_${Date.now()}`,
    inviteEmails,
    photoUrl,
  };

  const updated_workspaces = [...req.user.workspaces, newWorkspace];

  try {
    const updateParams = {
      TableName: "Users",
      Key: { googleId: req.user.googleId },
      UpdateExpression:
        "SET workspaces = :updated_workspaces, photoUrl = :photoUrl",
      ExpressionAttributeValues: {
        ":updated_workspaces": updated_workspaces,
        ":photoUrl": photoUrl,
      },
    };

    // console.log("UpdateParams:", updateParams);
    await DynamoDB.update(updateParams).promise();

    const putParams = {
      TableName: "Workspaces",
      Item: {
        id: newWorkspace.id,
        workspaceName: newWorkspace.name,
        inviteEmails: newWorkspace.inviteEmails,
        photoUrl: newWorkspace.photoUrl,
      },
    };

    await DynamoDB.put(putParams).promise();

    res.status(200).json({ success: true, message: "successful", status: 200 });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
