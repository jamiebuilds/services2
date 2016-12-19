import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import styleFlush from 'styled-jsx/flush'
import pify from 'pify';
import path from 'path';
import _fs from 'fs';

const fs = pify(_fs);

const PORT = 3000;

const servicesDir = path.join(__dirname, 'services');

async function main() {
  const api = express.Router();
  const app = express();

  app.use('/api', api);

  const servicesDirs = await fs.readdir(servicesDir);

  await Promise.all(servicesDirs.map(async (service) => {
    const serviceDir = path.join(servicesDir, service);

    require(path.join(serviceDir, 'api.js')).default(api);

    app.get(`/${service}*`, async (req, res) => {
      const filePath = path.join(serviceDir, 'pages', req.params['0']);
      let matchedPath;

      try {
        matchedPath = require.resolve(filePath);
      } catch (err) {
        // ...
      }

      const page = require(matchedPath);
      const props = page.fetch ? await page.fetch({ query: req.query }) : null;
      const element = React.createElement(page.default, props);

      const html = ReactDOMServer.renderToString(element);
      const styles = styleFlush();

      let result = html;

      for (let id in styles) {
        result += '<style>' + styles[id] + '</style>';
      }

      res.send(result);
    });
  }));

  app.listen(PORT, () => {
    console.log(`> Listening at http://localhost:${PORT}/`);
  });
}

main();
