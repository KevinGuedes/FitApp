// @ts-nocheck
const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();
const environment = argv.environment

function writeFileUsingFS(targetPath, environmentFileContent) {
    writeFile(targetPath, environmentFileContent, function (err) {
        if (err) {
            console.log(err);
        }
        if (environmentFileContent !== '') {
            console.log(`Environment variables wrote in ${targetPath}`);
        }
    });
}

const envDirectory = './src/environments';
if (!existsSync(envDirectory))
    mkdirSync(envDirectory);

const isProduction = environment === 'prod';
let targetPath;
if (isProduction) {
    writeFileUsingFS('./src/environments/environment.prod.ts', '');
    targetPath = './src/environments/environment.prod.ts';
}
else {
    writeFileUsingFS('./src/environments/environment.ts', '');
    targetPath = './src/environments/environment.ts';
}

const environmentFileContent = `export const environment = {
    production: ${isProduction},
    firebase: {
        projectId: '${process.env["FIREBASE_PROJECT_ID"]}',
        appId: '${process.env["FIREBASE_APP_ID"]}',
        storageBucket: '${process.env["FIREBASE_STORAGE_BUCKET"]}',
        apiKey: '${process.env["FIREBASE_API_KEY"]}',
        authDomain: '${process.env["FIREBASE_AUTH_DOMAIN"]}',
        messagingSenderId: '${process.env["FIREBASE_MESSAGING_SENDER_ID"]}',
        measurementId: '${process.env["FIREBASE_MEASUREMENT_ID"]}',
    }
};`;

writeFileUsingFS(targetPath, environmentFileContent);
