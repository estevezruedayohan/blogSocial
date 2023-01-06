const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");

const swaggerDoc = require("./swagger");
const { config } = require("./config/config");
const user = require("./components/user/network");

// app.use("/", (req, res) => {
//   res.send("Este es el SERVER de SOCIAL MEDIA - TVEZ");
// });

// app.use(cors()); requiere instalar package
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// ROUTER
app.use("/api/user", user);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc)
);

app.listen(config.port, () => {
  console.log(
    `Listen server on port ${config.host}:${config.port}`
  );
});
