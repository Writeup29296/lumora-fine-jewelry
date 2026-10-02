import { spawn, spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {
      await new Promise(r => setTimeout(r, 400));
    }
  }
  return false;
}

async function main() {
  const baseUrl = 'http://localhost:3001';
  let serverProcess = null;
  let alreadyRunning = false;

  try {
    const check = await fetch(`${baseUrl}/api/health`);
    if (check.ok) {
      alreadyRunning = true;
      console.log('ℹ️ Server already listening on http://localhost:3001');
    }
  } catch (e) {}

  if (!alreadyRunning) {
    console.log('🚀 Spawning Lumora Backend Server for test execution...');
    serverProcess = spawn(process.execPath, [path.join(__dirname, 'server.js')], {
      env: { ...process.env, PORT: '3001' },
      stdio: ['ignore', 'pipe', 'pipe']
    });

    const isHealthy = await waitForServer(`${baseUrl}/api/health`);
    if (!isHealthy) {
      console.error('❌ Server failed to respond to /api/health within timeout.');
      if (serverProcess) {
        try { process.kill(serverProcess.pid); } catch (e) {}
      }
      process.exit(1);
    }
    console.log('✅ Lumora Backend Server is ready and healthy.\n');
  }

  let code1 = 0;
  let code2 = 0;

  try {
    console.log('--- Running Suite 1: Full Backend & Storefront API Verification ---');
    const res1 = spawnSync(process.execPath, [path.join(__dirname, 'test-suite.js')], {
      stdio: 'inherit'
    });
    code1 = res1.status ?? 0;

    console.log('\n--- Running Suite 2: Canadian DDP & Cross-Border Tax Suite ---');
    const res2 = spawnSync(process.execPath, [path.join(__dirname, 'test-canada.js')], {
      stdio: 'inherit'
    });
    code2 = res2.status ?? 0;
  } finally {
    if (serverProcess) {
      console.log('\n🛑 Shutting down spawned test server...');
      try {
        // on Windows, tree-kill or taskkill can also be used if needed
        spawnSync('taskkill', ['/pid', serverProcess.pid.toString(), '/f', '/t']);
      } catch (e) {
        try { process.kill(serverProcess.pid); } catch (e2) {}
      }
    }
  }

  if (code1 !== 0 || code2 !== 0) {
    console.error(`❌ Automated tests failed. Suite 1 code: ${code1}, Suite 2 code: ${code2}`);
    process.exit(1);
  } else {
    console.log('\n💎 ALL LUMORA STOREFRONT & COMPLIANCE TESTS PASSED SUCCESSFULLY! 💎');
    process.exit(0);
  }
}

main();
