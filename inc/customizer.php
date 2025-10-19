<?php
/**
 * Customizer settings for {{theme_name}}
 *
 * @package {{theme_name}}
 * @since {{version}}
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add customizer settings.
 */
function {{theme_slug}}_customize_register( $wp_customize ) {
	// Add theme options section.
	$wp_customize->add_section(
		'{{theme_slug}}_options',
		array(
			'title'    => __( '{{theme_name}} Options', '{{theme_slug}}' ),
			'priority' => 130,
		)
	);

	// Footer text setting.
	$wp_customize->add_setting(
		'{{theme_slug}}_footer_text',
		array(
			'default'           => '{{default_footer_text}}',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);

	$wp_customize->add_control(
		'{{theme_slug}}_footer_text',
		array(
			'label'   => __( 'Footer Text', '{{theme_slug}}' ),
			'section' => '{{theme_slug}}_options',
			'type'    => 'text',
		)
	);

	// Show/hide social links setting.
	$wp_customize->add_setting(
		'{{theme_slug}}_show_social_links',
		array(
			'default'           => true,
			'sanitize_callback' => 'wp_validate_boolean',
		)
	);

	$wp_customize->add_control(
		'{{theme_slug}}_show_social_links',
		array(
			'label'   => __( 'Show Social Links', '{{theme_slug}}' ),
			'section' => '{{theme_slug}}_options',
			'type'    => 'checkbox',
		)
	);

	// Header layout setting.
	$wp_customize->add_setting(
		'{{theme_slug}}_header_layout',
		array(
			'default'           => 'default',
			'sanitize_callback' => 'sanitize_key',
		)
	);

	$wp_customize->add_control(
		'{{theme_slug}}_header_layout',
		array(
			'label'   => __( 'Header Layout', '{{theme_slug}}' ),
			'section' => '{{theme_slug}}_options',
			'type'    => 'select',
			'choices' => array(
				'default' => __( 'Default', '{{theme_slug}}' ),
				'centered' => __( 'Centered', '{{theme_slug}}' ),
				'minimal' => __( 'Minimal', '{{theme_slug}}' ),
			),
		)
	);
}
add_action( 'customize_register', '{{theme_slug}}_customize_register' );

/**
 * Output customizer CSS.
 */
function {{theme_slug}}_customizer_css() {
	$footer_text = get_theme_mod( '{{theme_slug}}_footer_text', '{{default_footer_text}}' );
	$header_layout = get_theme_mod( '{{theme_slug}}_header_layout', 'default' );
	
	$css = '';
	
	// Header layout styles.
	if ( 'centered' === $header_layout ) {
		$css .= '
			.wp-block-template-part[slug="header"] .wp-block-group {
				text-align: center;
			}
			.wp-block-template-part[slug="header"] .wp-block-navigation {
				justify-content: center;
			}
		';
	} elseif ( 'minimal' === $header_layout ) {
		$css .= '
			.wp-block-template-part[slug="header"] {
				border-bottom: 1px solid var(--wp--preset--color--neutral);
			}
			.wp-block-template-part[slug="header"] .wp-block-site-logo {
				display: none;
			}
		';
	}

	if ( ! empty( $css ) ) {
		echo '<style type="text/css" id="{{theme_slug}}-customizer-css">' . wp_strip_all_tags( $css ) . '</style>';
	}
}
add_action( 'wp_head', '{{theme_slug}}_customizer_css' );