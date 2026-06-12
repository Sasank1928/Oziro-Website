import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import fs from 'fs'

try {
  let log = '';
  const run = (cmd) => {
    try {
      log += `\n> ${cmd}\n`;
      const out = execSync(cmd, { stdio: 'pipe' }).toString();
      log += out;
    } catch(e) {
      log += `ERROR: ${e.message}\n${e.stdout ? e.stdout.toString() : ''}\n${e.stderr ? e.stderr.toString() : ''}`;
    }
  };

  run('git init');
  run('git add .');
  run('git commit -m "Initial commit for Oziro Website"');
  run('git branch -M main');
  run('git remote remove origin'); // In case it exists
  run('git remote add origin https://github.com/Sasank1928/Oziro-Website.git');
  // Attempt to push. Timeout in 30 seconds to prevent hanging if it asks for credentials
  try {
     log += '\n> git push -u origin main\n';
     const pushOut = execSync('git push -u origin main', { stdio: 'pipe', timeout: 30000 }).toString();
     log += pushOut;
  } catch(e) {
     log += `PUSH ERROR: ${e.message}\n${e.stdout ? e.stdout.toString() : ''}\n${e.stderr ? e.stderr.toString() : ''}`;
  }

  fs.writeFileSync('git_push_log.txt', log);
} catch (e) {
  fs.writeFileSync('git_push_log.txt', e.toString());
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
