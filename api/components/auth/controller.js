const TABLE = "auth";

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
  return {
    upsert,
  };
};
