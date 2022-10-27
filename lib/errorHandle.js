function errorHandle(error) {
  console.error(error);
  throw new Error('fallo en el operacion del servidor');
}

module.exports = { errorHandle };
