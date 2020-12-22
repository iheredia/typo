const fs = require('fs');
const path = require('path');

module.exports = (...args) => {
  const outputDir = path.join(...args);
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
  }
  return outputDir
}