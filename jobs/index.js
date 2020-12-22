const path = require('path');
const getFontsList = require('./helpers/get-fonts-list');
const downloadFile = require('./helpers/download-file');

const outputDir = path.join(__dirname, '..', 'fonts');

const main = async () => {
  const fonts = await getFontsList();
  const firstFont = fonts[0];
  const { family, variants, files } = firstFont;
  const filePath = path.join(outputDir, `${family}-${variants[0]}.ttf`);
  const url = files[variants[0]];
  downloadFile(filePath, url);
}

main();
