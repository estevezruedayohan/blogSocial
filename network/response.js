function success(req, res, message, status) {
  let statusCode = status || 200;
  let messageStatus = message || "Registro exitoso";
  res.send({
    error: false,
    status: statusCode,
    body: messageStatus,
  });
}

function error(req, res, message, status) {
  let statusCode = status || 500;
  let messageStatus = message || "Internal Error";
  res.send({
    error: false,
    status: statusCode,
    body: messageStatus,
  });
}

module.exports = { success, error };
