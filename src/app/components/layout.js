const React = require('react');
const PropTypes = require('prop-types');

const Layout = ({ children, scripts, styles }) => (
  <html lang="es-ar">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Typo</title>
    <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />

    { styles.map(href => <link key={href} rel="stylesheet" href={`/static/${href}`} />) }
  </head>
  <body>
    <div id="root">{ children }</div>
    { scripts.map(src => <script key={src} src={`/static/${src}`} />) }
  </body>
  </html>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  scripts: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.arrayOf(PropTypes.string),
};

Layout.defaultProps = {
  scripts: [],
  styles: [],
};

module.exports = Layout;
