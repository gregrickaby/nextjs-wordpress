<?php
/**
 * Revalidation functionality.
 *
 * @author Greg Rickaby
 * @since 1.0.0
 * @package NEXTJS_WORDPRESS_PLUGIN
 */

namespace NEXTJS_WORDPRESS_PLUGIN;

use \WP_Post;

/**
 * Flush the frontend cache when a post is updated.
 *
 * This function will fire anytime a post is updated.
 * Including: the post status, comments, meta, terms, etc.
 * The slug MUST have a leading slash and cannot have a railing slash!
 *
 * @usage https://nextjswp.com/api/wordpress/revalidate?token=123&slug=/the-slug
 *
 * @see https://developer.wordpress.org/reference/hooks/edit_post/
 * @see https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
 * @since 1.0.0
 * @author Greg Rickaby
 * @param int     $post_ID  The post ID.
 * @param WP_Post $post The post object.
 */
function on_demand_revalidation( $post_ID, WP_Post $post ) {

	// Do not run on autosave.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	// No constants or Post ID? Bail...
	if ( ! defined( 'HEADLESS_FRONTEND_URL' ) || ! defined( 'PREVIEW_SECRET_TOKEN' ) || ! $post_ID ) {
		return;
	}

	// Build and format the slug.
	$slug = \get_the_permalink( $post_ID );
	$slug = str_replace( \home_url(), '', $slug );
	$slug = trim( $slug, '/' );
	$slug = '/' . $slug;

	// Build the API URL.
	$api_url = HEADLESS_FRONTEND_URL . 'api/wordpress/revalidate';
	$api_url = \add_query_arg( 'token', PREVIEW_SECRET_TOKEN, $api_url );
	$api_url = \add_query_arg( 'slug', $slug, $api_url );

	// Make API request.
	$response = \wp_remote_post(
		\esc_url_raw( $api_url ),
		[
			'blocking' => true,
		]
	);

	// Check the response.
	if ( is_wp_error( $response ) ) {
		$error_message = $response->get_error_message();
		error_log( 'Revalidation error: ' . $error_message ); // phpcs:ignore
	}
}

/**
 * Handle post status transition.
 *
 * @param string $new_status New status.
 * @param string $old_status Old status.
 * @param object $post Post object.
 * @since 1.0.0
 * @author Greg Rickaby
 */
function transition_handler( $new_status, $old_status, $post ) {
	// If the post is a draft, bail.
	if ( 'draft' === $new_status && 'draft' === $old_status ) {
		return;
	}

	// Otherwise, revalidate.
	on_demand_revalidation( $post->ID, $post );
}
\add_action( 'transition_post_status', __NAMESPACE__ . '\transition_handler', 10, 3 );
