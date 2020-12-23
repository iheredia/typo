console.log(`


* Warning!
* This script will download a lot of files
* The total amount of space required is near 1gb


`);

const path = require('path');
const parallelLimit = require('async/parallelLimit');
const { getFontsList, downloadFile, makeOutputDir, ProgressBar } = require('./helpers');
const slugify = require('slugify');

const outputDir = path.join(__dirname, '..', 'fonts');
makeOutputDir(outputDir);
const progressBar = new ProgressBar('Downloading fonts');

const main = async () => {
  const fonts = await getFontsList(outputDir);

  const fontDownloadQueue = [];
  fonts.forEach(fontFamily => {
    const { family, variants, files } = fontFamily;
    const familyName = slugify(family, { lower: true });
    const familyOutputDir = path.join(outputDir, familyName);
    makeOutputDir(familyOutputDir);

    variants.forEach(fontVariant => {
      const filePath = path.join(familyOutputDir, `${fontVariant}.ttf`);
      const url = files[fontVariant];
      fontDownloadQueue.push(async () => {
        await downloadFile(filePath, url);
        progressBar.tick();
      });
    });

  });

  console.log(`${fontDownloadQueue.length} files from ${fonts.length} fonts`);
  progressBar.setTotal(fontDownloadQueue.length);
  return parallelLimit(fontDownloadQueue, 5);
}

main();
