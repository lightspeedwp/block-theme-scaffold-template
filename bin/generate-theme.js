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

/**
 * Sanitize user input to prevent security vulnerabilities
 */
function sanitizeInput(input, type = 'text') {
  if (!input || typeof input !== 'string') {
    return null;
  }

  // Remove null bytes and control characters
  let sanitized = input.replace(/[\x00-\x1F\x7F]/g, '');

  // Prevent path traversal
  if (sanitized.includes('..') || sanitized.includes('/') || sanitized.includes('\\')) {
    throw new Error(`Invalid input: path traversal detected in "${input}"`);
  }

  switch (type) {
    case 'slug':
      // Only allow lowercase letters, numbers, and hyphens
      sanitized = sanitized.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      if (!sanitized || sanitized.length < 2) {
        throw new Error('Slug must be at least 2 characters long and contain only letters, numbers, and hyphens');
      }
      break;
    case 'name':
      // Allow alphanumeric and common punctuation
      sanitized = sanitized.replace(/[^a-zA-Z0-9 \-_.,']/g, '').trim();
      if (!sanitized || sanitized.length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }
      break;
    case 'url':
      // Basic URL validation
      try {
        const url = new URL(sanitized);
        if (!['http:', 'https:'].includes(url.protocol)) {
          throw new Error('URL must use http or https protocol');
        }
        sanitized = url.toString();
      } catch (e) {
        throw new Error(`Invalid URL format: ${e.message}`);
      }
      break;
    case 'version':
      // Validate semver or WordPress version format
      const versionRegex = /^\d+\.\d+(\.\d+)?(-[a-zA-Z0-9.-]+)?$/;
      if (!versionRegex.test(sanitized)) {
        throw new Error('Version must follow semantic versioning (e.g., 1.0.0 or 6.5)');
      }
      break;
    case 'license':
      // Allow only common license identifiers
      sanitized = sanitized.replace(/[^a-zA-Z0-9.-]/g, '');
      break;
    default:
      // General text sanitization
      sanitized = sanitized.replace(/[<>"'`]/g, '').trim();
  }

  return sanitized;
}

const args = process.argv.slice(2);
const argMap = {};
args.forEach((arg, i) => {
  if (arg.startsWith('--')) {
    argMap[arg.replace('--', '')] = args[i + 1];
  }
});

try {
  const author = sanitizeInput(argMap.author, 'name') || 'Author Name';
  const authorUri = sanitizeInput(argMap.author_uri, 'url') || 'https://example.com';
  const themeSlug = sanitizeInput(argMap.slug, 'slug') || 'my-theme';

  const placeholders = {
    '{{theme_slug}}': themeSlug,
    '{{theme_name}}': sanitizeInput(argMap.name, 'name') || 'My Theme',
    '{{description}}': sanitizeInput(argMap.description, 'text') || 'A WordPress block theme.',
    '{{author}}': author,
    '{{author_uri}}': authorUri,
    '{{version}}': sanitizeInput(argMap.version, 'version') || '1.0.0',
    '{{theme_uri}}': sanitizeInput(argMap.theme_uri, 'url') || 'https://example.com/theme',
    '{{min_wp_version}}': sanitizeInput(argMap.min_wp_version, 'version') || '6.0',
    '{{tested_wp_version}}': sanitizeInput(argMap.tested_wp_version, 'version') || '6.5',
    '{{min_php_version}}': sanitizeInput(argMap.min_php_version, 'version') || '7.4',
    '{{license}}': sanitizeInput(argMap.license, 'license') || 'GPL-2.0-or-later',
    '{{license_uri}}': sanitizeInput(argMap.license_uri, 'url') || 'https://www.gnu.org/licenses/gpl-2.0.html',
    '{{theme_repo_url}}': sanitizeInput(argMap.theme_repo_url, 'url') || `https://github.com/${author}/${themeSlug}`,
    '{{namespace}}': themeSlug.replace(/-/g, '_'),
    '{{support_url}}': `https://wordpress.org/support/theme/${themeSlug}`,
    '{{support_email}}': `support@${authorUri.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}`,
    '{{security_email}}': `security@${authorUri.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}`,
    '{{business_email}}': `contact@${authorUri.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}`,
    '{{docs_url}}': `https://github.com/${author}/${themeSlug}/wiki`,
    '{{docs_repo_url}}': `https://github.com/${author}/${themeSlug}`,
    '{{discord_url}}': authorUri,
    '{{custom_dev_url}}': authorUri,
    '{{premium_support_url}}': authorUri,
  };

  // Validate that placeholders aren't using defaults when user provided input
  if (argMap.author && placeholders['{{author}}'] === 'Author Name') {
    throw new Error('Invalid author name provided');
  }

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
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
