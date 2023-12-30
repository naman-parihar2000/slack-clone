const mongoose = require("mongoose");

module.exports = async function connectAndStartServer(app) {
  try {
    await mongoose.connect(process.env.MONGODB_SERVER_STRING);
    console.log("MONGODB CONNECTED!");

    const port = process.env.PORT || 5100;
    app.listen(port, () => {
      console.log(`SERVER RUNNING ${port}!`);
    });

  } catch (error) {
    console.log(error);
  }
};
