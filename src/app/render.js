const React = require('react');
const Layout = require('./components/layout');
const View = require('./components/view');
const { renderToString } = require('react-dom/server');

module.exports = (req, res) => {
  const scripts = [ res.locals.assetPath(`main.js`) ];
  const styles = [ res.locals.assetPath(`main.css`) ];
  const page = (
  <Layout scripts={scripts} styles={styles}>
    <View />
  </Layout>
);
  const pageContent = `<!doctype html>${renderToString(page)}`;
  res.send(pageContent)
};
