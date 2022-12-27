const express = require("express");
const app = express();

const { config } = require("./config/config");
const user = require("./components/user/network");

// app.use("/", (req, res) => {
//   res.send("Este es el SERVER de SOCIAL MEDIA - TVEZ");
// });

app.use("/api/user", user);

app.listen(config.port, () => {
  console.log(
    `Listen server on port ${config.host}:${config.port}`
  );
});
