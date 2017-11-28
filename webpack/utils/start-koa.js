import cp from 'child_process';
import path from 'path';
import watch from 'node-watch';

process.env.NODE_CONFIG_ENV = "server";
import config from 'config';


let server;
let started;
let serverReload;
const KOA_PATH = path.join(__dirname, '../../src/server/index');

const startServer = () => {

    // Define `restartServer`
    const restartServer = () => {
        console.log('restarting koa application');
        serverReload = true;
        server.kill('SIGTERM');
        return startServer();
    };

    const env = {...process.env, NODE_ENV: config.NODE_ENV, BABEL_ENV: config.KOA_BABEL_ENV, BROWSER: config.SERVER.BROWSER };

    // start the server process
    server = cp.fork(KOA_PATH, {env});
    // when server is `online`
    server.once('message', (message) => {
        if (message.match(/^online$/)) {
            if (serverReload) {
                serverReload = false;
                //browserSync.reload();
            }
            if (!started) {
                started = true;

                // Listen for `rs` in stdin to restart server
                console.log('type `rs` in console for restarting koa application');
                process.stdin.setEncoding('utf8');
                process.stdin.on('data', (data) => {
                    const parsedData = (data + '').trim().toLowerCase();
                    if (parsedData === 'rs') return restartServer();
                });

                // Start watcher on server files and restart server on change
                const server_path = path.join(__dirname, '../../src/server');
                // const app_path = path.join(__dirname, '../../app');
                watch([server_path], () => restartServer());
            }
        }
    });
};

// kill server on exit
process.on('exit', () => server.kill('SIGTERM'));
export default () => !server ? startServer() : () => ({});
