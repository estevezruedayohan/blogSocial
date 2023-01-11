const bcrypt = require("bcrypt");
const TABLE = "auth";
const auth = require("./../../../jwt");

module.exports = function (bdInjected) {
  let store = bdInjected;
  if (!store) {
    require("./../../../store/dummy");
  }

  async function upsert(data) {
    let authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(
        data.password,
        10
      );
    }

    return store.upsert(TABLE, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLE, {
      username: username,
    });
    return bcrypt
      .compare(password, data.password)
      .then((isMatch) => {
        if (isMatch) {
          return auth.sign(data);
        } else {
          throw new Error("Información inválida.");
        }
      });
  }

  return {
    upsert,
    login,
  };
};
