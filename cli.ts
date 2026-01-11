#!/usr/bin/env tsx
// filepath: /Users/michal/repos/ccct/my-plop-project/cli.ts

import path from "node:path";
import { Plop, run } from "plop";
import { fileURLToPath } from "node:url";

// User's directory (where files will be generated)
// Use INIT_CWD (set by npm/pnpm) to get the actual directory where command was run
const workingDir = process.env.INIT_CWD || process.cwd();

// Your package directory (where templates are located)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plopfilePath = path.join(__dirname, "plopfile.ts");

Plop.prepare(
  {
    cwd: __dirname, // Set to package dir so templates are found
    configPath: plopfilePath,
    preload: [],
  },
  (env) =>
    Plop.execute(env, (env) => {
      const options = {
        ...env,
        dest: workingDir, // But generate files in user's directory
        destBasePath: workingDir, // Ensure base path is user's directory
      };
      return run(options, undefined, true);
    })
);
