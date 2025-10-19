<?php
/**
 * Functions and definitions for {{theme_name}}
 *
 * @package {{theme_name}}
 * @since {{version}}
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Theme version.
 */
define( '{{theme_slug|upper}}_VERSION', '{{version}}' );

/**
 * Theme setup.
 */
function {{theme_slug}}_setup() {
	// Add theme support for various features.
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'html5', array( 'comment-form', 'comment-list', 'gallery', 'caption' ) );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'custom-logo' );

	// Add editor styles.
	add_editor_style( 'public/css/editor.css' );

	// Set content width.
	$GLOBALS['content_width'] = apply_filters( '{{theme_slug}}_content_width', {{content_width_px}} );
}
add_action( 'after_setup_theme', '{{theme_slug}}_setup' );

/**
 * Enqueue theme assets.
 */
function {{theme_slug}}_enqueue_assets() {
	// Main stylesheet.
	$asset_file = get_theme_file_path( 'public/css/style.asset.php' );
	if ( file_exists( $asset_file ) ) {
		$asset = include $asset_file;
		wp_enqueue_style(
			'{{theme_slug}}-style',
			get_theme_file_uri( 'public/css/style.css' ),
			$asset['dependencies'] ?? array(),
			$asset['version'] ?? {{theme_slug|upper}}_VERSION
		);
	}

	// Main JavaScript.
	$js_asset_file = get_theme_file_path( 'public/js/theme.asset.php' );
	if ( file_exists( $js_asset_file ) ) {
		$js_asset = include $js_asset_file;
		wp_enqueue_script(
			'{{theme_slug}}-script',
			get_theme_file_uri( 'public/js/theme.js' ),
			$js_asset['dependencies'] ?? array(),
			$js_asset['version'] ?? {{theme_slug|upper}}_VERSION,
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', '{{theme_slug}}_enqueue_assets' );

/**
 * Enqueue editor assets.
 */
function {{theme_slug}}_enqueue_editor_assets() {
	$editor_asset_file = get_theme_file_path( 'public/css/editor.asset.php' );
	if ( file_exists( $editor_asset_file ) ) {
		$editor_asset = include $editor_asset_file;
		wp_enqueue_style(
			'{{theme_slug}}-editor-style',
			get_theme_file_uri( 'public/css/editor.css' ),
			$editor_asset['dependencies'] ?? array(),
			$editor_asset['version'] ?? {{theme_slug|upper}}_VERSION
		);
	}
}
add_action( 'enqueue_block_editor_assets', '{{theme_slug}}_enqueue_editor_assets' );

/**
 * Register block pattern categories.
 */
function {{theme_slug}}_register_pattern_categories() {
	$categories = array(
		'{{theme_slug}}-hero'    => array( 'label' => __( '{{theme_name}} Hero', '{{theme_slug}}' ) ),
		'{{theme_slug}}-about'   => array( 'label' => __( '{{theme_name}} About', '{{theme_slug}}' ) ),
		'{{theme_slug}}-contact' => array( 'label' => __( '{{theme_name}} Contact', '{{theme_slug}}' ) ),
		'{{theme_slug}}-cta'     => array( 'label' => __( '{{theme_name}} Call to Action', '{{theme_slug}}' ) ),
		'{{theme_slug}}-gallery' => array( 'label' => __( '{{theme_name}} Gallery', '{{theme_slug}}' ) ),
		'{{theme_slug}}-team'    => array( 'label' => __( '{{theme_name}} Team', '{{theme_slug}}' ) ),
	);

	foreach ( $categories as $slug => $args ) {
		register_block_pattern_category( $slug, $args );
	}
}
add_action( 'init', '{{theme_slug}}_register_pattern_categories' );

/**
 * Load theme includes.
 */
$theme_includes = array(
	'inc/block-patterns.php',
	'inc/block-styles.php',
	'inc/customizer.php',
	'inc/template-functions.php',
);

foreach ( $theme_includes as $file ) {
	$filepath = get_theme_file_path( $file );
	if ( file_exists( $filepath ) ) {
		require_once $filepath;
	}
}

/**
 * Add custom image sizes.
 */
function {{theme_slug}}_add_image_sizes() {
	add_image_size( '{{theme_slug}}-featured', {{featured_image_width}}, {{featured_image_height}}, true );
	add_image_size( '{{theme_slug}}-thumbnail', {{thumbnail_width}}, {{thumbnail_height}}, true );
	add_image_size( '{{theme_slug}}-gallery', {{gallery_image_width}}, {{gallery_image_height}}, true );
}
add_action( 'after_setup_theme', '{{theme_slug}}_add_image_sizes' );

/**
 * Modify excerpt length.
 */
function {{theme_slug}}_excerpt_length( $length ) {
	return {{excerpt_length}};
}
add_filter( 'excerpt_length', '{{theme_slug}}_excerpt_length' );

/**
 * Modify excerpt more.
 */
function {{theme_slug}}_excerpt_more( $more ) {
	return '{{excerpt_more}}';
}
add_filter( 'excerpt_more', '{{theme_slug}}_excerpt_more' );