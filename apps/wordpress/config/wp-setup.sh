#!/bin/bash

# WordPress Setup Script.
# This script is run by WP-CLI when the container is started.

# Activate all plugins.
wp plugin activate --all

# Activate the Next.js WordPress theme.
wp theme activate nextjs-wordpress-theme

# Create pages required pages.
wp post create --post_type="page" --post_title="Homepage" --post_content="<!-- wp:paragraph --><p>Welcome to the homepage. Feel free to edit this page.</p><!-- /wp:paragraph -->" --post_status="publish"
wp post create --post_type="page" --post_title="Blog" --post_status="publish"
wp post create --post_type="page" --post_title="404 Not Found" --post_content="<!-- wp:paragraph --><p>Uh oh! That page cannot be found. Try returning to the <a href="/">homepage</a>.</p<!-- /wp:paragraph -->" --post_status="publish"

# Assign pages to their respective WordPress settings.
wp option update show_on_front page
wp option update page_on_front 4
wp option update page_for_posts 5

# Create menus.
wp menu create "Header"
wp menu item add-post header 2
wp menu item add-post header 5
wp menu location assign header header-menu
wp menu create "Footer"
wp menu location assign footer footer-menu

# Import Custom Post Type.
wp cptui import --type="post_type" --data-path="./config/cptui-post-types.json"

# Set permalinks in order to activate REST-API.
wp rewrite structure "/%year%/%monthnum%/%day%/%postname%/"

# Show a message.
echo -e "Installation is complete! 🔥"
sleep 1

echo -e "Visit http://localhost:8888/wp-admin/ to log into WordPress."
echo -e "username: admin"
echo -e "password: password"
sleep 1

# Exit with success code.
exit 0
