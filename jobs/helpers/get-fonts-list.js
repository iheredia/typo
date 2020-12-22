const axios = require('axios');
const { apiKey } = require('../../credentials.json');

module.exports = async () => {
  const googleFontsAPIUrl = 'https://www.googleapis.com/webfonts/v1/webfonts';
  const params = { sort: 'popularity', key: apiKey };

  const { data: { items } } = await axios.get(googleFontsAPIUrl, { params })
  return items
}