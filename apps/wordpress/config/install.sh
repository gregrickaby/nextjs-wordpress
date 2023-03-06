#!/bin/bash

# WordPress Install Script.
# This script automates the installation and configuration of WordPress.

# Change directories.
cd ../

# Install plugins.
composer install

# Setup WordPress.
# https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/
wp-env start

# Configure WordPress.
wp-env run cli /bin/bash config/wp-setup.sh
