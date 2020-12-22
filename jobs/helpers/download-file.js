const http = require('http');
const fs = require('fs');

module.exports = (filePath, url) => {
  const file = fs.createWriteStream(filePath);
  return http.get(url, response => response.pipe(file));
};
