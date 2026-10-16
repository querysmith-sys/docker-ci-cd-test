import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { app } from './server.js';
import { promisify } from 'node:util';

describe('Endpoint Tests', () => {
    let server;

    before(async () => {
        server = app.listen(0)
        await new Promise(resolve => server.once('listening', resolve));
        
        const port = server.address().port;
        console.log(`Test server running on port ${port}`);
    })

    after(async () => {
        if (server) {
            // Convert server.close into an async/await function
            const closeServer = promisify(server.close.bind(server));
            await closeServer(); 
            console.log('Test server closed');
        }
    })

    test('GET / should return welcome message', async () => {
        const port = server.address().port;
        const url = `http://localhost:${port}`;
        const response = await fetch(`${url}/`);
        const text = await response.text();
        assert.strictEqual(response.status, 200);
        assert.ok(text.includes('Welcome to the Express Server CI & CD DEMO!'));
    })
    test('GET /health should return health status', async () => {
        const port = server.address().port;
        const url = `http://localhost:${port}`;
        const response = await fetch(`${url}/health`);
        const text = await response.text();
        assert.strictEqual(response.status, 200);
        assert.strictEqual(text, 'Server is healthy!');
    })
})
