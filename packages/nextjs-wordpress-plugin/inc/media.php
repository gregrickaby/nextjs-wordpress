<?php
/**
 * Media functionality.
 *
 * @author Greg Rickaby
 * @since 1.0.0
 * @package NEXTJS_WORDPRESS_PLUGIN
 */

namespace NEXTJS_WORDPRESS_PLUGIN;

/**
 * Add custom image sizes.
 */
function customize_media() {
	\add_image_size( 'nineteen-twenty', 1920, 1080, true );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\customize_media' );

/**
 * Disable "BIG Image" functionality.
 *
 * @see https://developer.wordpress.org/reference/hooks/big_image_size_threshold/
 */
add_filter( 'big_image_size_threshold', '__return_false' );
