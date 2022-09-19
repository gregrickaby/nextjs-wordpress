#!/bin/bash

# Simple spinner function.
spin() {
  spinner="/|\\-/|\\-"
  while :
  do
    for i in `seq 0 7`
    do
      echo -n "${spinner:$i:1}"
      echo -en "\010"
      sleep 1
    done
  done
}

spin &
SPIN_PID=$!
trap "kill -9 $SPIN_PID" `seq 0 15`

# Wait.
echo -e "\e[36mWaiting for the MySQL database and WordPress files to be created...\e[0m"
sleep 45

# Read ENV variables.
echo -e "\e[36mReading ENV variables...\e[0m"
source .env
sleep 2

# Setup Headless WordPress.
echo -e "\e[36mStarting setup of Headless WordPress...\e[0m"
sleep 2
wp --info
wp core install --url="https://${WORDPRESS_URL}" --title="${WORDPRESS_TITLE}" --admin_user="${WORDPRESS_USERNAME}" --admin_password="${WORDPRESS_PASSWORD}" --admin_email="${WORDPRESS_EMAIL}" --skip-email
wp theme activate twentytwentyone
wp theme delete twentytwenty twentytwentytwo
wp plugin delete akismet hello
wp plugin activate --all
wp post create --post_type="page" --post_title="Homepage" --post_content="<!-- wp:paragraph --><p>Welcome to the homepage. Feel free to edit this page.</p><!-- /wp:paragraph -->" --post_status="publish"
wp post create --post_type="page" --post_title="Blog" --post_status="publish"
wp option update show_on_front page
wp option update page_on_front 4
wp option update page_for_posts 5
wp menu create "Header"
wp menu item add-post header 2
wp menu item add-post header 5
wp menu location assign header header-menu
wp rewrite structure "/%year%/%monthnum%/%day%/%postname%/"
echo -e "\e[32m\e[1mSuccess:\e[0m\e[0m WordPress setup complete!"
sleep 1
echo -e "\e[36m\e[1mInfo:\e[0m\e[0m Please add the following entry to your hosts file: \e[36m\e[1m127.0.0.1 ${WORDPRESS_URL}\e[0m\e[0m"
sleep 1
echo -e "\e[36m\e[1mInfo:\e[0m\e[0m Visit https://${WORDPRESS_URL}/wp-admin to log into WordPress."
exit 0
