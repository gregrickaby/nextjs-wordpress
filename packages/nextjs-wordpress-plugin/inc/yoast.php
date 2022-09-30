<?php
/**
 * Yoast SEO settings.
 *
 * @see https://wordpress.org/plugins/wordpress-seo/
 * @author Greg Rickaby
 * @since 1.0.0
 * @package NEXTJS_WORDPRESS_PLUGIN
 */

namespace NEXTJS_WORDPRESS_PLUGIN;

/**
 * Filters the canonical URL for Yoast SEO.
 *
 * @see https://developer.yoast.com/features/seo-tags/canonical-urls/api#change-the-canonical-url

 * @param string $canonical The current page's generated canonical URL.
 * @return string The filtered canonical URL.
 */
function filter_canonical( $canonical ) {
	if ( ! defined( 'HEADLESS_FRONTEND_URL' ) ) {
		return $canonical;
	}

	// Replace WordPress URL with front-end URL.
	return str_replace( \trailingslashit( \get_home_url() ), \trailingslashit( HEADLESS_FRONTEND_URL ), $canonical );
}
add_filter( 'wpseo_canonical', __NAMESPACE__ . '\filter_canonical' );
add_filter( 'wpseo_opengraph_url', __NAMESPACE__ . '\filter_canonical' );
