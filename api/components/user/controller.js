const TABLE = "users";
const auth = require("./../auth");

module.exports = function (bdInjected) {
  let store = bdInjected;
  if (!store) {
    store = require("./../../../store/dummy");
  }
  function list() {
    const list = store.list(TABLE);
    return list;
  }

  function get(id) {
    const user = store.get(TABLE, id);
    return user;
  }

  async function upsert(body) {
    const idData = body.id;
    let newUser = {
      name: body.name,
      username: body.username,
    };

    if (!idData) {
      // const { nanoid } = await require("nanoid");
      const { nanoid } = await import("nanoid"); // se reemplazó con el import dinámico ya que al parecer este fue insertado en un ECMASCRIPT anterior
      const id = nanoid();
      newUser.id = id;
    }

    if (body.username || body.password) {
      await auth.upsert({
        id: newUser.id,
        username: newUser.username,
        password: body.password,
      });
    }

    const rta = store.upsert(TABLE, newUser);
    return rta;
  }

  function deleteUser(id) {
    const rta = store.remove(TABLE, id);
    return rta;
  }

  return { list, get, upsert, deleteUser };
};
