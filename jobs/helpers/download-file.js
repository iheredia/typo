const http = require('http');
const fs = require('fs');

module.exports = (filePath, url) => {
  const file = fs.createWriteStream(filePath);
  return new Promise((resolve, reject) => {
    http.get(url, response => {
      response.pipe(file);
      file.on('finish', () => resolve());
    }).on('error', err => {
      fs.unlinkSync(filePath);
      reject(err)
    });
  })
};
