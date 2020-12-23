const path = require('path');
const slugify = require('slugify');
const { registerFont } = require('canvas')
const fonts = require('../../fonts/fonts');

const fontsDir = path.join(__dirname, '..', '..', 'fonts');

module.exports = () => {
  fonts.forEach(fontFamily => {
    const { family, variants } = fontFamily;
    const familyName = slugify(family, { lower: true });
    const familyDir = path.join(fontsDir, familyName)
    variants.forEach(fontVariant => {
      const variantFilePath = path.join(familyDir, `${fontVariant}.ttf`);
      registerFont(variantFilePath, { family: `${familyName}-${fontVariant}` })
    })
  })
}