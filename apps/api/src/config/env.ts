import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

export const loadEnv = () => {
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'api/.env'),
    path.resolve(__dirname, '..', '.env'),
    path.resolve(__dirname, '..', '..', '.env'),
  ];

  const existingEnvFile = candidates.find((candidate) => fs.existsSync(candidate));

  if (existingEnvFile) {
    dotenv.config({ path: existingEnvFile });
    return;
  }

  dotenv.config();
};
