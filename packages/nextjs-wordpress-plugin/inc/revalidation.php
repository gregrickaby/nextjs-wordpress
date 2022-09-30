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
 * @usage https://gregrickaby.com/api/wordpress/revalidate?token=123&slug=/the-slug
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
	$slug = str_replace( home_url(), '', $slug );
	$slug = ltrim( $slug, '/' );
	$slug = rtrim( $slug, '/' );
	$slug = '/' . $slug;

	// Build the API URL.
	$api_url = HEADLESS_FRONTEND_URL . '/api/wordpress/revalidate';
	$api_url = \add_query_arg( 'token', PREVIEW_SECRET_TOKEN, $api_url );
	$api_url = \add_query_arg( 'slug', $slug, $api_url );

	// Make API request.
	$response = \wp_remote_post( esc_url_raw( $api_url ), [ 'blocking' => true ] );

	// Check the response.
	$response_code    = \wp_remote_retrieve_response_code( $response );
	$response_message = \wp_remote_retrieve_response_message( $response );

	// Error handle the response.
	if ( 200 !== $response_code && ! empty( $response_message ) ) {
		return new \WP_Error( 'grd-headless-core-revalidation-error', $response_message );
	} elseif ( 200 !== $response_code ) {
		return new \WP_Error( 'grd-headless-core-revalidation-error', sprintf( 'GRD Headless Core: Error %d: %s', $response_code, $response_message ) );
	} else {
		return;
	}
}
add_action( 'edit_post', __NAMESPACE__ . '\on_demand_revalidation', 10, 3 );
