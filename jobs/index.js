const path = require('path');
const parallelLimit = require('async/parallelLimit');
const { getFontsList, downloadFile, makeOutputDir, ProgressBar } = require('./helpers');

const outputDir = path.join(__dirname, '..', 'fonts');
makeOutputDir(outputDir);
const progressBar = new ProgressBar('Downloading fonts');

const main = async () => {
  const fonts = await getFontsList();

  const fontDownloadQueue = [];
  [fonts[0], fonts[1]].forEach(fontFamily => {
    const { family, variants, files } = fontFamily;
    variants.forEach(fontVariant => {
      const filePath = path.join(outputDir, `${family}-${fontVariant}.ttf`);
      const url = files[fontVariant];
      fontDownloadQueue.push(async () => {
        await downloadFile(filePath, url);
        progressBar.tick();
      });
    });
  });

  progressBar.setTotal(fontDownloadQueue.length);
  parallelLimit(fontDownloadQueue, 1);
}

main();
