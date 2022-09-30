<?php
/**
 * Plugin Name: Next.js WordPress Plugin
 * Plugin URI:  https://github.com/gregrickaby/nextjs-wordpress-plugin
 * Description: A plugin to help turn WordPress into a headless CMS.
 * Version:     1.0.3
 * Author:      Greg Rickaby <greg@gregrickaby.com>
 * Author URI:  https://gregrickaby.com
 * License:     MIT
 *
 * @package NEXTJS_WORDPRESS_PLUGIN
 */

namespace NEXTJS_WORDPRESS_PLUGIN;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

// Define constants.
define( 'NEXTJS_WORDPRESS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'NEXTJS_WORDPRESS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'NEXTJS_WORDPRESS_VERSION', '1.0.3' );

// Require files.
require_once 'inc/blocks.php';
require_once 'inc/editor.php';
require_once 'inc/links.php';
require_once 'inc/media.php';
require_once 'inc/menus.php';
require_once 'inc/revalidation.php';
require_once 'inc/wp-graphql.php';
require_once 'inc/yoast.php';
