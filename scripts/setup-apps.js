import fs from 'fs';
import path from 'path';

const apps = [
  { name: 'artist', port: 3001, title: 'Madhur Studio – Artist Dashboard' },
  { name: 'label', port: 3002, title: 'Madhur – Label Hub' },
  { name: 'podcast', port: 3003, title: 'Madhur – Podcast Studio' },
  { name: 'promoter', port: 3004, title: 'Madhur – Events Manager' },
  { name: 'moderator', port: 3005, title: 'Madhur Console – Trust & Safety' },
  { name: 'admin', port: 3006, title: 'Madhur Console – System Admin' }
];

const workspaceRoot = '/Users/saumy/Desktop/MusicLovers/Pulse';

apps.forEach(app => {
  const appPath = path.join(workspaceRoot, 'apps', app.name);

  // 1. Update package.json
  const pkgPath = path.join(appPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.name = app.name;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
    console.log(`Updated package.json for ${app.name}`);
  }

  // 2. Update vite.config.ts
  const vitePath = path.join(appPath, 'vite.config.ts');
  if (fs.existsSync(vitePath)) {
    let config = fs.readFileSync(vitePath, 'utf8');
    // Replace port: 3000 with port: app.port
    config = config.replace(/port:\s*3000/, `port: ${app.port}`);
    fs.writeFileSync(vitePath, config, 'utf8');
    console.log(`Updated vite.config.ts for ${app.name} (port ${app.port})`);
  }

  // 3. Update index.html
  const htmlPath = path.join(appPath, 'index.html');
  if (fs.existsSync(htmlPath)) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    // Replace <title>...</title> with <title>app.title</title>
    html = html.replace(/<title>.*?<\/title>/, `<title>${app.title}</title>`);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`Updated index.html for ${app.name} (title: ${app.title})`);
  }
});
