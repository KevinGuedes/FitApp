// @ts-nocheck
const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const ENVIRONMENT = argv.environment;
const ENVIROMENTS_PATH = './src/environments';
const ENVIRONMENT_NAMES = new Map([
    ['dev', 'Development'],
    ['test', 'Test'],
    ['stg', 'Staging'],
    ['prod', 'Production'],
])
const ENVIRONMENT_FILE_CONTENT = `export const environment = {
    production: ${ENVIRONMENT === 'prod'},
    firebase: {
        projectId: '${process.env["FIREBASE_PROJECT_ID"]}',
        appId: '${process.env["FIREBASE_APP_ID"]}',
        storageBucket: '${process.env["FIREBASE_STORAGE_BUCKET"]}',
        apiKey: '${process.env["FIREBASE_API_KEY"]}',
        authDomain: '${process.env["FIREBASE_AUTH_DOMAIN"]}',
        messagingSenderId: '${process.env["FIREBASE_MESSAGING_SENDER_ID"]}',
        measurementId: '${process.env["FIREBASE_MEASUREMENT_ID"]}',
        finishedExercisesCollectionName: '${process.env["FIREBASE_FINISHED_EXERCISES_COLLECTION_NAME"]}',
        availableExercisesCollectionName: '${process.env["FIREBASE_AVAILABLE_EXERCISES_COLLECTION_NAME"]}',
    }
};`;

if (!existsSync(ENVIROMENTS_PATH))
    mkdirSync(ENVIROMENTS_PATH);

writeFile('./src/environments/environment.ts', ENVIRONMENT_FILE_CONTENT, error => {
    if (error) console.error(error);
    else console.log(`Environment variables configured for ${ENVIRONMENT_NAMES.get(ENVIRONMENT)} environment`);
});
