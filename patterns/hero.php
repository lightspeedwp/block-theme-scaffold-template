<?php
/**
 * Title: {{hero_pattern_title}}
 * Slug: {{theme_slug}}/hero
 * Categories: featured, call-to-action
 * Keywords: hero, banner, cta, featured
 * Description: {{hero_pattern_description}}
 */
?>
<!-- wp:cover {"url":"{{hero_image_url}}","dimRatio":50,"overlayColor":"black","minHeight":600,"contentPosition":"center center","align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:600px">
	<span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim"></span>
	<div class="wp-block-cover__inner-container">
		<!-- wp:group {"layout":{"type":"constrained"}} -->
		<div class="wp-block-group">
			<!-- wp:heading {"textAlign":"center","level":1,"fontSize":"huge"} -->
			<h1 class="wp-block-heading has-text-align-center has-huge-font-size">{{hero_title}}</h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"align":"center","fontSize":"large"} -->
			<p class="has-text-align-center has-large-font-size">{{hero_description}}</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
			<div class="wp-block-buttons">
				<!-- wp:button {"className":"is-style-fill"} -->
				<div class="wp-block-button is-style-fill"><a class="wp-block-button__link wp-element-button" href="{{hero_button_url}}">{{hero_button_text}}</a></div>
				<!-- /wp:button -->

				<!-- wp:button {"className":"is-style-outline"} -->
				<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="{{hero_button_secondary_url}}">{{hero_button_secondary_text}}</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:group -->
	</div>
</div>
<!-- /wp:cover -->
