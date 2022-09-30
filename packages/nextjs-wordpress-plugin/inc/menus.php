<?php
/**
 * Navigation menu functionality.
 *
 * @author Greg Rickaby
 * @since 1.0.0
 * @package NEXTJS_WORDPRESS_PLUGIN
 */

namespace NEXTJS_WORDPRESS_PLUGIN;

/**
 * Register nav menus.
 */
function register_menus() {
	\register_nav_menus(
		[
			'footer-menu' => \esc_html__( 'Footer Menu' ),
			'header-menu' => \esc_html__( 'Header Menu' ),
		]
	);
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\register_menus' );
