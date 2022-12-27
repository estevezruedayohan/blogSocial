const db = {
  users: [
    { id: 1, name: "Yohan", age: "41" },
    { id: 2, name: "Manuel", age: "50" },
  ],
};

function list(table) {
  return db[table];
}

function get(table, id) {
  return db[table].find((item) => item.id === id);
}

function upsert(table, data) {
  return db[table].push(data);
}

function remove(table, id) {
  const index = db[table].indexOf((item) => item.id === id);
  if (index) {
    db[table].splice(index, 1);
    return "Elemento eliminado con éxito";
  } else {
    return false;
  }
}

module.exports = { list, get, upsert, remove };
