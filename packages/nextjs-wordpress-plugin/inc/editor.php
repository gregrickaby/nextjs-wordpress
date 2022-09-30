<?php
/**
 * Page/post editor functionality.
 *
 * @author Greg Rickaby
 * @since 1.0.0
 * @package NEXTJS_WORDPRESS_PLUGIN
 */

namespace NEXTJS_WORDPRESS_PLUGIN;

/**
 * Customize settings for the page/post editor.
 */
function customize_editor() {
	// Add support for post thumbnails.
	\add_theme_support( 'post-thumbnails' );

	// Add excerpts to pages.
	\add_post_type_support( 'page', 'excerpt' );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\customize_editor' );

/**
 * Wrap WYSIWYG embed in a div wrapper for responsive
 *
 * @param string $html HTML string.
 * @param string $url  Current URL.
 * @param string $attr Embed attributes.
 * @param string $id   Post ID.
 * @return string
 */
function embed_wrapper( $html, $url, $attr, $id ) {
	return '<div class="iframe-wrapper">' . $html . '</div>';
}
add_filter( 'embed_oembed_html', __NAMESPACE__ . '\embed_wrapper', 10, 4 );
