#!/usr/bin/env node

/**
 * bin/generate-theme.js
 *
 * Script to generate a new WordPress block theme from this scaffold, replacing all moustache placeholders.
 * Usage: node bin/generate-theme.js --slug my-theme --name "My Theme" --description "Description here" --author "Your Name" --author_uri "https://yourdomain.com" --version "1.0.0"
 */

const fs = require('fs');
const path = require('path');

const scaffoldDir = path.resolve(__dirname, '..');
const outputDir = path.resolve(process.cwd(), 'output-theme');

const args = process.argv.slice(2);
const argMap = {};
args.forEach((arg, i) => {
  if (arg.startsWith('--')) {
    argMap[arg.replace('--', '')] = args[i + 1];
  }
});

const placeholders = {
  '{{theme_slug}}': argMap.slug || 'my-theme',
  '{{theme_name}}': argMap.name || 'My Theme',
  '{{description}}': argMap.description || 'A WordPress block theme.',
  '{{author}}': argMap.author || 'Author Name',
  '{{author_uri}}': argMap.author_uri || 'https://example.com',
  '{{version}}': argMap.version || '1.0.0',
  '{{theme_uri}}': argMap.theme_uri || 'https://example.com/theme',
  '{{min_wp_version}}': argMap.min_wp_version || '6.0',
  '{{tested_wp_version}}': argMap.tested_wp_version || '6.5',
  '{{min_php_version}}': argMap.min_php_version || '7.4',
  '{{license}}': argMap.license || 'GPL-2.0-or-later',
  '{{license_uri}}': argMap.license_uri || 'https://www.gnu.org/licenses/gpl-2.0.html',
  '{{theme_repo_url}}': argMap.theme_repo_url || 'https://github.com/example/theme',
};

function replacePlaceholders(content) {
  let result = content;
  for (const [key, value] of Object.entries(placeholders)) {
    result = result.split(key).join(value);
  }
  return result;
}

function copyAndReplace(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    for (const file of fs.readdirSync(src)) {
      // Skip node_modules, dist, .git, output-theme
      if (["node_modules", "dist", ".git", "output-theme"].includes(file)) continue;
      copyAndReplace(path.join(src, file), path.join(dest, file.replace('{{theme_slug}}', placeholders['{{theme_slug}}'])));
    }
  } else {
    let content = fs.readFileSync(src, 'utf8');
    content = replacePlaceholders(content);
    fs.writeFileSync(dest, content);
  }
}

function main() {
  if (fs.existsSync(outputDir)) {
    console.error(`Output directory ${outputDir} already exists. Remove it or choose another location.`);
    process.exit(1);
  }
  fs.mkdirSync(outputDir);
  // Copy everything except node_modules, dist, .git, output-theme
  for (const file of fs.readdirSync(scaffoldDir)) {
    if (["node_modules", "dist", ".git", "output-theme", "bin"].includes(file)) continue;
    copyAndReplace(path.join(scaffoldDir, file), path.join(outputDir, file.replace('{{theme_slug}}', placeholders['{{theme_slug}}'])));
  }
  // Copy bin directory but skip generate-theme.js itself
  const binSrc = path.join(scaffoldDir, 'bin');
  const binDest = path.join(outputDir, 'bin');
  fs.mkdirSync(binDest);
  for (const file of fs.readdirSync(binSrc)) {
    if (file === 'generate-theme.js') continue;
    copyAndReplace(path.join(binSrc, file), path.join(binDest, file));
  }
  console.log(`Theme generated at ${outputDir}`);
}

main();
