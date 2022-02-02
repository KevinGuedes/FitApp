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
            console.log(`Environtment variables wrote in ${targetPath}`);
        }
    });
}

const envDirectory = './src/environments';

if (!existsSync(envDirectory)) {
    mkdirSync(envDirectory);
}

writeFileUsingFS('./src/environments/environment.prod.ts', '');
writeFileUsingFS('./src/environments/environment.ts', '');

const isProduction = environment === 'prod';

const targetPath = isProduction
    ? './src/environments/environment.prod.ts'
    : './src/environments/environment.ts';

const environmentFileContent = `export const environment = {
    production: ${isProduction},
    firebase: {
        projectId: '${process.env["fit-app-64ca6"]}',
        appId: '${process.env["FIREBASE_APP_ID"]}',
        storageBucket: '${process.env["FIREBASE_STORAGE_BUCKET"]}',
        locationId: '${process.env["FIREBASE_LOCATION_ID"]}',
        apiKey: '${process.env["FIREBASE_API_KEY"]}',
        authDomain: '${process.env["FIREBASE_AUTH_DOMAIN"]}',
        messagingSenderId: '${process.env["FIREBASE_MESSAGING_SENDER_ID"]}',
        measurementId: '${process.env["FIREBASE_MEASUREMENT_ID"]}',
    }
};`;

writeFileUsingFS(targetPath, environmentFileContent);
