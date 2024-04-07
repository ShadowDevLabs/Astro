import { createBareServer } from '@tomphttp/bare-server-node';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { dynamicPath } from '@nebula-services/dynamic';
import express from 'express';
import mime from 'mime';

import http from 'node:http';
import url from 'node:url';
import os from 'node:os';

const bare = createBareServer('/bare/');
const port = process.env.PORT || 8080;
const server = http.createServer();
const app = express();

const shutdown = () => {
  server.close();
  bare.close();

  console.log('\nSuccessfully terminated astro');

  process.exit(0);
}

app.get('/g/files/*', async (req, res, next) => {
    const reqTarget = `https://rawcdn.githack.com/ShadowDevLabs/files/main/${req.path.replace('/g/files/', '')}`;

    try {
        const asset = await fetch(reqTarget);

        if (asset.status == 200) {
            var data = Buffer.from(await asset.arrayBuffer());

            if (mime.getType(reqTarget) === 'text/html') data = data + '<script src=\'/assets/js/inject.js\' preload=\'true\'></script>';

            res.end(data);
        } else next();
    } catch (e) { next(); }
});

app.use(express.static('./public/', { extensions: ['html'] }));
app.use('/uv/', express.static(uvPath));
app.use('/dynamic/', express.static(dynamicPath));
app.use((req, res) => res.sendFile(url.fileURLToPath(new URL('../public/404.html', import.meta.url))));

server.on('request', (req, res) => {
  if (bare.shouldRoute(req)) bare.routeRequest(req, res);
  else app(req, res);
});

server.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
  else socket.end();
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

server.listen(port, () => {
  const address = server.address();

  console.log('Astro Proxy listening.\n');
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${os.hostname()}:${address.port}`);
  console.log(`\thttp://${address.family === 'IPv6' ? `[${address.address}]` : address.address}:${address.port}`);
});