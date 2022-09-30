<?php
/**
 * WP GraphQL settings.
 *
 * @see https://wordpress.org/plugins/wp-graphql/
 * @author Greg Rickaby
 * @since 1.0.0
 * @package NEXTJS_WORDPRESS_PLUGIN
 */

namespace NEXTJS_WORDPRESS_PLUGIN;

/**
 * Register Gravatar URL with GraphQL.
 */
function register_gravatar_url() {
	\register_graphql_field(
		'Commenter',
		'gravatarUrl',
		[
			'type'        => 'String',
			'description' => \esc_html__( 'Adds a Gravatar URL to the Comment Author', 'grd-headless-core' ),
			'resolve'     => function( $comment_author, $args, $context, $info ) {
				$object = null;

				// Check if dealing with user or guest commenter.
				if ( $comment_author->__get( 'userId' ) ) { // User.

					// Get the user ID.
					$user_id = $comment_author->__get( 'userId' );

					// Fetch the user.
					$object = \get_user_by( 'ID', $user_id );
				} else { // Guest commenter.

					// Get the comment ID.
					$comment_id = $comment_author->__get( 'databaseId' );

					// Fetch the comment.
					$object = \get_comment( $comment_id );
				}

				// Set avatar args.
				$args = [
					'size' => '150',
				];

				// Fetch the gravatar url.
				$gravatar_url = \get_avatar_url( $object, $args );

				// In case something goes wrong, fallback to the mystery person avatar.
				if ( false === $gravatar_url ) {
					$gravatar_url = "https://secure.gravatar.com/avatar/5cf23001579ee91aff54a2dcd6e5acc9?s={$args['size']}&d=mm&r=g";
				}

				return $gravatar_url;
			},
		]
	);
}
add_action( 'graphql_register_types', __NAMESPACE__ . '\register_gravatar_url' );
