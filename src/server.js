const express = require('express')
const path = require('path');
const manifestHelpers = require('express-manifest-helpers').default;

const apiRouter = require('./api');
const appRouter = require('./app');

const app = express()

const manifestPath = path.join(__dirname, '..', 'dist', 'manifest.json');
const manifestMiddleware = manifestHelpers({ manifestPath });
app.use(manifestMiddleware);

const staticFolderPath = path.join(__dirname, '..', 'public');
const clientFolderPath = path.join(__dirname, '..', 'dist');
app.use('/static', express.static(staticFolderPath, {maxAge: '1y', immutable: true}));
app.use('/static', express.static(clientFolderPath, {maxAge: '1y', immutable: true}));

app.use('/api', apiRouter);
app.use('/', appRouter);

module.exports = app
