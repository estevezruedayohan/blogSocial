const db = {
  users: [
    { id: "1", name: "Yohan", username: "yohitan55" },
    { id: "2", name: "Manuel", username: "manny" },
  ],
};

async function list(table) {
  return (await db[table]) || [];
}

async function get(table, id) {
  const user = await db[table].find(
    (item) => item.id === id
  );
  if (user === undefined) {
    throw new Error("Información inválida");
  }
  return user;
}

async function query(table, filter) {
  const keyFilter = Object.keys(filter);
  const key = keyFilter[0];
  const user = await db[table].find(
    (item) => item[key] === filter[key]
  );
  if (user === undefined) {
    throw new Error("Información inválida");
  }
  return user;
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }
  const user = await db[table].find(
    // es para determinar si existe un usuario con el mismo id
    (item) => item.id === data.id
  );
  if (!(user === undefined)) {
    throw false;
  }

  const newUser = await db[table].push(data);

  return newUser;
}

async function remove(table, id) {
  // const user = await db[table].find(
  //   (item) => item.id === id
  // );
  const index = await db[table].findIndex(
    (item) => item.id === id
  );
  if (index === -1) {
    throw false;
  } else {
    db[table].splice(index, 1);
    return "Elemento eliminado con éxito";
  }
}

module.exports = { list, get, upsert, remove, query };
