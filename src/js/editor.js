/**
 * Editor JavaScript enhancements
 */

// Register custom block styles in the editor
wp.domReady( function() {
	// Unregister unwanted core block styles
	wp.blocks.unregisterBlockStyle( 'core/quote', 'large' );
	wp.blocks.unregisterBlockStyle( 'core/separator', 'wide' );
	wp.blocks.unregisterBlockStyle( 'core/separator', 'dots' );

	// Register custom block variations
	wp.blocks.registerBlockVariation( 'core/group', {
		name: '{{theme_slug}}-card',
		title: '{{theme_name}} Card',
		description: 'A styled card container',
		category: 'design',
		icon: 'admin-page',
		attributes: {
			className: 'is-style-shadow',
			style: {
				spacing: {
					padding: {
						top: 'var:preset|spacing|medium',
						right: 'var:preset|spacing|medium',
						bottom: 'var:preset|spacing|medium',
						left: 'var:preset|spacing|medium'
					}
				}
			}
		}
	} );

	// Add custom formatting options
	wp.richText.registerFormatType( '{{theme_slug}}/highlight', {
		title: 'Highlight',
		tagName: 'mark',
		className: 'highlight',
		edit: function( { isActive, value, onChange } ) {
			return wp.element.createElement(
				wp.blockEditor.RichTextToolbarButton,
				{
					icon: 'admin-customizer',
					title: 'Highlight',
					onClick: function() {
						onChange(
							wp.richText.toggleFormat( value, {
								type: '{{theme_slug}}/highlight'
							} )
						);
					},
					isActive: isActive
				}
			);
		}
	} );
} );

// Editor theme utilities
const {{theme_slug|camelCase}}Editor = {
	/**
	 * Add custom classes to blocks based on attributes
	 */
	addBlockClasses() {
		const { addFilter } = wp.hooks;
		
		addFilter(
			'blocks.getSaveContent.extraProps',
			'{{theme_slug}}/add-block-classes',
			function( props, blockType, attributes ) {
				if ( blockType.name === 'core/group' && attributes.className ) {
					props.className = attributes.className;
				}
				return props;
			}
		);
	},

	/**
	 * Customize block editor sidebar
	 */
	customizeSidebar() {
		const { registerPlugin } = wp.plugins;
		const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
		const { PanelBody, TextControl } = wp.components;
		const { __ } = wp.i18n;

		const {{theme_slug|camelCase}}Sidebar = () => {
			return wp.element.createElement(
				PluginSidebar,
				{
					name: '{{theme_slug}}-sidebar',
					title: '{{theme_name}} Settings',
					icon: 'admin-appearance'
				},
				wp.element.createElement(
					PanelBody,
					{ title: __( 'Theme Options', '{{theme_slug}}' ) },
					wp.element.createElement( 'p', null, __( 'Custom theme settings will appear here.', '{{theme_slug}}' ) )
				)
			);
		};

		registerPlugin( '{{theme_slug}}-sidebar', {
			render: {{theme_slug|camelCase}}Sidebar
		} );
	}
};

// Initialize editor enhancements
wp.domReady( function() {
	{{theme_slug|camelCase}}Editor.addBlockClasses();
	{{theme_slug|camelCase}}Editor.customizeSidebar();
} );