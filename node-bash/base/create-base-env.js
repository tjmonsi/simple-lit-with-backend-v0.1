import { readFileSync, writeFileSync, existsSync } from 'fs';

const env = readFileSync('secret/.example.env', 'utf8');

if (!existsSync('secret/.env')) {
  writeFileSync('secret/.env', env, 'utf8');
}
