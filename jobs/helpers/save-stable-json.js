const stringify = require('json-stable-stringify');
const fs = require('fs');

module.exports = (filePath, obj) => {
  const objectJSON = stringify(obj, { space: 2 });
  return fs.promises.writeFile(filePath, objectJSON);
}

