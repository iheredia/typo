const axios = require('axios');
const path = require('path');
const { apiKey } = require('../../credentials.json');
const saveStableJSON = require('./save-stable-json');

module.exports = async (outputDir) => {
  const googleFontsAPIUrl = 'https://www.googleapis.com/webfonts/v1/webfonts';
  const params = { sort: 'popularity', key: apiKey };

  const { data: { items } } = await axios.get(googleFontsAPIUrl, { params })

  const jsonFilePath = path.join(outputDir, 'fonts.json');
  saveStableJSON(jsonFilePath, items);

  return items
}