const { AzureFunction, HttpMethod } = require('@azure/functions');

const fs = require('fs');
const path = require('path');
const db = require('../../db.js'); // Import the database connection file

const httpTrigger = new AzureFunction('httpTrigger', HttpMethod.GET, async (context, req) => {
    context.log('JavaScript HTTP trigger function processed a request.');

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Default HTML file
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    }[extname] || 'application/octet-stream';

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        context.res = {
            status: 200,
            headers: {
                'Content-Type': contentType
            },
            body: content
        };
    } catch (error) {
        if (error.code === 'ENOENT') {
            context.res = {
                status: 404,
                body: '404 Not Found'
            };
        } else {
            context.res = {
                status: 500,
                body: '500 Internal Server Error'
            };
        }
    }

    db.connectDB(); // Connect to the database
});

module.exports = httpTrigger;
