#!/bin/bash

# Setup WordPress - This script is called by WP CLI in `docker-compose.yml`.
echo -e "\e[36mSetup WordPress...\e[0m"
sleep 2
source .env
wp --info
wp core install --url="https://${WORDPRESS_URL}" --title="${WORDPRESS_TITLE}" --admin_user="${WORDPRESS_USERNAME}" --admin_password="${WORDPRESS_PASSWORD}" --admin_email="${WORDPRESS_EMAIL}" --skip-email
wp theme activate nextjs-wordpress-theme
wp theme delete twentytwenty twentytwentyone
wp plugin delete akismet hello
wp plugin activate --all
wp post create --post_type="page" --post_title="Homepage" --post_content="<!-- wp:paragraph --><p>Welcome to the homepage. Feel free to edit this page.</p><!-- /wp:paragraph -->" --post_status="publish"
wp post create --post_type="page" --post_title="Blog" --post_status="publish"
wp post create --post_type="page" --post_title="404 Not Found" --post_content="<!-- wp:paragraph --><p>Uh oh! That page cannot be found. Try returning to the <a href="/">homepage</a>.</p<!-- /wp:paragraph -->" --post_status="publish"
wp option update show_on_front page
wp option update page_on_front 4
wp option update page_for_posts 5
wp menu create "Header"
wp menu item add-post header 2
wp menu item add-post header 5
wp menu location assign header header-menu
wp menu create "Footer"
wp menu location assign footer footer-menu
wp rewrite structure "/%year%/%monthnum%/%day%/%postname%/"
echo -e "\e[32m\e[1mSuccess:\e[0m\e[0m WordPress setup complete!"
sleep 2
exit 0
