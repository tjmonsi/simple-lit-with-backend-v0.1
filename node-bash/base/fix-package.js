import { readFileSync, writeFileSync } from 'fs';

const json = readFileSync('package.json', 'utf8');
const newJSON = JSON.stringify(JSON.parse(json), null, 2);

writeFileSync('package.json', newJSON, 'utf8');
