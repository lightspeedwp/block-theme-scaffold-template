#!/usr/bin/env node

/**
 * Build and deployment utility script
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const THEME_DIR = path.resolve(__dirname, '..');
const PACKAGE_JSON = path.join(THEME_DIR, 'package.json');

/**
 * Get package.json data
 */
function getPackageData() {
	try {
		return JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
	} catch (error) {
		console.error('Error reading package.json:', error.message);
		process.exit(1);
	}
}

/**
 * Run command and handle errors
 */
function runCommand(command, options = {}) {
	try {
		console.log(`Running: ${command}`);
		return execSync(command, { 
			stdio: 'inherit',
			cwd: THEME_DIR,
			...options 
		});
	} catch (error) {
		console.error(`Command failed: ${command}`);
		process.exit(1);
	}
}

/**
 * Build theme for production
 */
function buildProduction() {
	console.log('Building theme for production...');
	
	// Clean previous build
	runCommand('rm -rf public/*');
	
	// Build assets
	runCommand('npm run build:production');
	
	// Optimize images (if imagemin is available)
	try {
		runCommand('npx imagemin assets/images/* --out-dir=public/images');
	} catch (error) {
		console.log('Image optimization skipped (imagemin not available)');
	}
	
	console.log('Production build complete!');
}

/**
 * Create distribution package
 */
function createDistribution() {
	const pkg = getPackageData();
	const version = pkg.version;
	const themeName = pkg.name;
	
	console.log(`Creating distribution package for ${themeName} v${version}...`);
	
	// Build for production first
	buildProduction();
	
	// Create dist directory
	const distDir = path.join(THEME_DIR, 'dist');
	const themeDistDir = path.join(distDir, themeName);
	
	runCommand(`rm -rf ${distDir}`);
	runCommand(`mkdir -p ${themeDistDir}`);
	
	// Copy theme files (excluding development files)
	runCommand(`rsync -av --exclude-from=.distignore . ${themeDistDir}/`);
	
	// Create ZIP file
	const zipName = `${themeName}-${version}.zip`;
	runCommand(`cd ${distDir} && zip -r ${zipName} ${themeName}/`);
	
	console.log(`Distribution package created: dist/${zipName}`);
}

/**
 * Run theme checks
 */
function runChecks() {
	console.log('Running theme checks...');
	
	// Lint code
	runCommand('npm run lint');
	
	// Run tests
	runCommand('npm test');
	
	// Check WordPress standards (if WP CLI is available)
	try {
		runCommand('wp theme status');
	} catch (error) {
		console.log('WordPress CLI checks skipped (WP CLI not available)');
	}
	
	console.log('All checks passed!');
}

/**
 * Initialize development environment
 */
function initDev() {
	console.log('Initializing development environment...');
	
	// Install dependencies
	runCommand('npm install');
	runCommand('composer install');
	
	// Setup git hooks
	runCommand('npm run prepare');
	
	// Start WordPress environment
	try {
		runCommand('npm run env:start');
		console.log('WordPress environment started at http://localhost:8889');
	} catch (error) {
		console.log('WordPress environment setup skipped');
	}
	
	console.log('Development environment ready!');
}

/**
 * Update theme version
 */
function updateVersion(newVersion) {
	if (!newVersion) {
		console.error('Please provide a version number');
		process.exit(1);
	}
	
	console.log(`Updating theme version to ${newVersion}...`);
	
	// Update package.json
	const pkg = getPackageData();
	pkg.version = newVersion;
	fs.writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2));
	
	// Update style.css
	const styleCss = path.join(THEME_DIR, 'style.css');
	let styleContent = fs.readFileSync(styleCss, 'utf8');
	styleContent = styleContent.replace(/Version: .*/, `Version: ${newVersion}`);
	fs.writeFileSync(styleCss, styleContent);
	
	console.log(`Version updated to ${newVersion}`);
}

// Main script logic
const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
	case 'build':
		buildProduction();
		break;
	case 'dist':
		createDistribution();
		break;
	case 'check':
		runChecks();
		break;
	case 'init':
		initDev();
		break;
	case 'version':
		updateVersion(arg);
		break;
	default:
		console.log(`
Usage: node build.js <command> [args]

Commands:
  build     Build theme for production
  dist      Create distribution package
  check     Run linting and tests
  init      Initialize development environment
  version   Update theme version

Examples:
  node build.js build
  node build.js dist
  node build.js version 1.2.0
		`);
}