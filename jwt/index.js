const jwt = require("jsonwebtoken");

function sign(data) {
  return jwt.sign(data, "SECRETO");
}

module.exports = {
  sign,
};
