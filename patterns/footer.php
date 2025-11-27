<?php
/**
 * Title: Footer
 * Slug: {{theme_slug}}/footer
 * Categories: {{theme_slug}}-footer
 * Block Types: core/template-part/footer
 * Description: <?php esc_html_e( 'Footer with site info, navigation, and social links', '{{theme_slug}}' ); ?>
 *
 * @package {{theme_name}}
 * @since {{version}}
 */
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|large","bottom":"var:preset|spacing|large"},"margin":{"top":"var:preset|spacing|x-large"}}},"backgroundColor":"neutral","textColor":"background","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background-color has-neutral-background-color has-text-color has-background" style="margin-top:var(--wp--preset--spacing--x-large);padding-top:var(--wp--preset--spacing--large);padding-bottom:var(--wp--preset--spacing--large)">
	<!-- wp:group {"align":"wide","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
	<div class="wp-block-group alignwide">
		<!-- wp:group {"layout":{"type":"constrained","contentSize":"400px"}} -->
		<div class="wp-block-group">
			<!-- wp:site-title {"level":0,"fontSize":"large"} /-->
			<!-- wp:site-tagline {"fontSize":"small"} /-->

			<!-- wp:paragraph {"fontSize":"small","style":{"spacing":{"margin":{"top":"var:preset|spacing|small"}}}} -->
			<p class="has-small-font-size" style="margin-top:var(--wp--preset--spacing--small)"><?php echo esc_html_x( '© 2024 All rights reserved.', 'Default footer text', '{{theme_slug}}' ); ?></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"constrained","contentSize":"300px"}} -->
		<div class="wp-block-group">
			<!-- wp:heading {"level":3,"fontSize":"medium"} -->
			<h3 class="wp-block-heading has-medium-font-size"><?php esc_html_e( 'Quick Links', '{{theme_slug}}' ); ?></h3>
			<!-- /wp:heading -->

			<!-- wp:navigation {"textColor":"background","overlayMenu":"never","layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"var:preset|spacing|small"}}} /-->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"constrained","contentSize":"300px"}} -->
		<div class="wp-block-group">
			<!-- wp:heading {"level":3,"fontSize":"medium"} -->
			<h3 class="wp-block-heading has-medium-font-size"><?php esc_html_e( 'Follow Us', '{{theme_slug}}' ); ?></h3>
			<!-- /wp:heading -->

			<!-- wp:social-links {"iconColor":"background","iconColorValue":"var(--wp--preset--color--background)","className":"is-style-logos-only"} -->
			<ul class="wp-block-social-links has-icon-color is-style-logos-only">
				<!-- wp:social-link {"url":"#","service":"twitter"} /-->
				<!-- wp:social-link {"url":"#","service":"facebook"} /-->
				<!-- wp:social-link {"url":"#","service":"instagram"} /-->
				<!-- wp:social-link {"url":"#","service":"linkedin"} /-->
			</ul>
			<!-- /wp:social-links -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->

	<!-- wp:separator {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|large","bottom":"var:preset|spacing|medium"}}},"backgroundColor":"background","className":"is-style-wide"} -->
	<hr class="wp-block-separator alignwide has-text-color has-background-color has-background-background-color has-background is-style-wide" style="margin-top:var(--wp--preset--spacing--large);margin-bottom:var(--wp--preset--spacing--medium)"/>
	<!-- /wp:separator -->

	<!-- wp:group {"align":"wide","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
	<div class="wp-block-group alignwide">
		<!-- wp:paragraph {"fontSize":"small"} -->
		<p class="has-small-font-size">
			<?php
			printf(
				/* translators: %s: WordPress link */
				esc_html__( 'Proudly powered by %s', '{{theme_slug}}' ),
				'<a href="' . esc_url( __( 'https://wordpress.org', '{{theme_slug}}' ) ) . '" rel="nofollow">WordPress</a>'
			);
			?>
		</p>
		<!-- /wp:paragraph -->

		<!-- wp:paragraph {"fontSize":"small"} -->
		<p class="has-small-font-size">
			<a href="<?php echo esc_url( get_privacy_policy_url() ); ?>"><?php esc_html_e( 'Privacy Policy', '{{theme_slug}}' ); ?></a> |
			<a href="#"><?php esc_html_e( 'Terms of Service', '{{theme_slug}}' ); ?></a>
		</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
