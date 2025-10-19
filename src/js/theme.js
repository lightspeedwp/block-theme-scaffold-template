/**
 * Main theme JavaScript
 */

// Skip link functionality
document.addEventListener( 'DOMContentLoaded', function() {
	// Add skip link
	const skipLink = document.createElement( 'a' );
	skipLink.href = '#main';
	skipLink.className = 'skip-link screen-reader-text';
	skipLink.textContent = '{{skip_link_text}}';
	document.body.insertBefore( skipLink, document.body.firstChild );

	// Smooth scroll for anchor links
	const anchorLinks = document.querySelectorAll( 'a[href^="#"]' );
	anchorLinks.forEach( link => {
		link.addEventListener( 'click', function( e ) {
			const href = this.getAttribute( 'href' );
			const target = document.querySelector( href );
			
			if ( target ) {
				e.preventDefault();
				target.scrollIntoView( {
					behavior: 'smooth',
					block: 'start'
				} );
			}
		} );
	} );

	// Mobile menu accessibility
	const navToggle = document.querySelector( '.wp-block-navigation__responsive-container-open' );
	if ( navToggle ) {
		navToggle.addEventListener( 'click', function() {
			const expanded = this.getAttribute( 'aria-expanded' ) === 'true';
			this.setAttribute( 'aria-expanded', ! expanded );
		} );
	}

	// Focus management for modal dialogs
	const modals = document.querySelectorAll( '[role="dialog"]' );
	modals.forEach( modal => {
		const focusableElements = modal.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		
		if ( focusableElements.length > 0 ) {
			focusableElements[0].focus();
		}
	} );
} );

// Theme utilities
const {{theme_slug|camelCase}} = {
	/**
	 * Initialize theme features
	 */
	init() {
		this.setupAnimations();
		this.setupLazyLoading();
	},

	/**
	 * Setup scroll animations
	 */
	setupAnimations() {
		if ( 'IntersectionObserver' in window ) {
			const observer = new IntersectionObserver( entries => {
				entries.forEach( entry => {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'is-visible' );
					}
				} );
			}, {
				threshold: 0.1
			} );

			const animatedElements = document.querySelectorAll( '.animate-on-scroll' );
			animatedElements.forEach( el => observer.observe( el ) );
		}
	},

	/**
	 * Setup lazy loading for images
	 */
	setupLazyLoading() {
		if ( 'loading' in HTMLImageElement.prototype ) {
			const images = document.querySelectorAll( 'img[data-src]' );
			images.forEach( img => {
				img.src = img.dataset.src;
				img.removeAttribute( 'data-src' );
			} );
		} else {
			// Fallback for browsers without native lazy loading
			const script = document.createElement( 'script' );
			script.src = 'https://cdn.jsdelivr.net/npm/intersection-observer@0.12.0/intersection-observer.js';
			document.head.appendChild( script );
		}
	}
};

// Initialize theme
document.addEventListener( 'DOMContentLoaded', () => {
	{{theme_slug|camelCase}}.init();
} );