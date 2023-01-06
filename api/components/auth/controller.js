const TABLE = "auth";
const auth = require("./../../../jwt");

module.exports = function (bdInjected) {
  let store = bdInjected;
  if (!store) {
    require("./../../../store/dummy");
  }

  function upsert(data) {
    let authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = data.password;
    }

    return store.upsert(TABLE, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLE, {
      username: username,
    });
    if (data.password === password) {
      const token = auth.sign(data);
      return token;
    } else {
      throw new Error("Información inválida.");
    }
  }

  return {
    upsert,
    login,
  };
};
