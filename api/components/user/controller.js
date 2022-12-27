const store = require("./../../../store/dummy");

const TABLE = "users";

function list() {
  const users = store.list(TABLE);
  return users;
}

module.exports = { list };
