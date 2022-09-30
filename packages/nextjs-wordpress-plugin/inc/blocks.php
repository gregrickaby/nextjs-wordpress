<?php
/**
 * Blocks functionality.
 *
 * @author Greg Rickaby
 * @since 1.0.0
 * @package NEXTJS_WORDPRESS_PLUGIN
 */

namespace NEXTJS_WORDPRESS_PLUGIN;

/**
 * Create the rest field.
 */
function create_field() {

	$rest_post_types = array_values( \get_post_types( [ 'show_in_rest' => true ] ) );

	/**
	 * Registers a new rest field.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_rest_field/
	 */
	\register_rest_field(
		$rest_post_types,
		'gutenberg_blocks',
		[
			'get_callback' => __NAMESPACE__ . '\get_blocks',
		]
	);
}
add_action( 'rest_api_init', __NAMESPACE__ . '\create_field' );

/**
 * Get the blocks for a post and parse them into an array.
 *
 * @see https://developer.wordpress.org/reference/functions/parse_blocks/
 *
 * @param array  $post The post array.
 * @param array  $attr The attr array.
 * @param object $request The WP_REST_Request object for the current request.
 * @return array Parsed gutenberg block data, empty if blocks=true param not present on request.
 */
function get_blocks( $post, $attr, $request ): array {

	$rtn = [];

	if ( ! $request->get_param( 'blocks' ) ) {
		return $rtn;
	}

	if ( ! is_array( $post ) || ! isset( $post['id'] ) ) {
		return $rtn;
	}

	$post_obj = \get_post( absint( $post['id'] ) );

	if ( \is_wp_error( $post_obj ) ) {
		return $rtn;
	}

	return \parse_blocks( $post_obj->post_content ) ?? $rtn;
}
