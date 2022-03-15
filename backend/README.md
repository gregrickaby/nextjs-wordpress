# WordPress Setup <!-- omit in toc -->

The following instructions will help you get started with setting up the WordPress backend.

> Note: All CLI commands must be run from inside the `/backend` directory. [Docker Desktop](https://www.docker.com/products/docker-desktop) needs to be running as well.

---

## Table of Contents <!-- omit in toc -->

- [Install](#install)
  - [1) Copy ENV Variables](#1-copy-env-variables)
  - [2) Customize ENV Variables (optional)](#2-customize-env-variables-optional)
  - [3) Create Containers](#3-create-containers)
  - [4) Run Setup Script](#4-run-setup-script)
  - [5) Log into WordPress](#5-log-into-wordpress)
- [Managing The Environment](#managing-the-environment)
  - [GraphQL](#graphql)
  - [WordPress Constants](#wordpress-constants)
  - [WP CLI](#wp-cli)
  - [Composer](#composer)
  - [phpMyAdmin](#phpmyadmin)
- [Docker Compose](#docker-compose)
  - [Start Containers](#start-containers)
  - [Pause Containers](#pause-containers)
  - [Stop Containers](#stop-containers)
  - [Recreate Containers](#recreate-containers)
  - [Destroy Containers](#destroy-containers)
  - [Tunnel Into Containers](#tunnel-into-containers)
- [Custom Post Types and Fields](#custom-post-types-and-fields)
  - [Import Book CPT](#import-book-cpt)
  - [Import Book Custom Fields](#import-book-custom-fields)

---

## Install

### 1) Copy ENV Variables

From inside the `/backend` directory, run the following command:

```bash
cp .env.sample .env
```

---

### 2) Customize ENV Variables (optional)

If you'd like, open the `.env` file in your editor, and customize the following values:

```text
# MySQL Creds
MYSQL_ROOT_PASSWORD="root"

# WordPress DB Creds
WORDPRESS_DB_HOST="mysql"
WORDPRESS_DB_NAME="wordpress"
WORDPRESS_DB_USER="wordpress"
WORDPRESS_DB_PASSWORD="wordpress"

# WordPress Creds
WORDPRESS_TITLE="Next.js WordPress"
WORDPRESS_USERNAME="wordpress"
WORDPRESS_PASSWORD="wordpress"
WORDPRESS_EMAIL="foo@bar.com"

# Headless Creds
HEADLESS_FRONTEND_URL="http://localhost:3000/"
```

Save the the `.env` file.

---

### 3) Create Containers

The following command will create the containers for the first time:

```bash
docker-compose up -d
```

This pulls down the required images, creates each container in detached mode (in the background), then starts each container. Composer will also pull in the required plugins automatically.

The following containers will be created:

- Composer
- MariaDB (MySQL)
- phpMyAdmin
- WordPress
- WP-CLI

> During the first run, this process can take several minutes to complete! Please be patient.

---

### 4) Run Setup Script

The setup script will configure WordPress for you. Run the following command:

```bash
docker exec -it wpcli bash -c "chmod +x setup.sh && ./setup.sh && exit"
```

> You only need to run this command once. If you destroy and recreate the containers at a later time, you can run this command again.

---

### 5) Log into WordPress

View the WordPress dashboard at: <http://localhost:8000/wp-admin/>

- username `wordpress`
- password `wordpress`

> Use the credentials above, unless you've customized the `WORDPRESS_USERNAME` and `WORDPRESS_PASSWORD` variables in the `.env` file.

That's it!

---

## Managing The Environment

### GraphQL

GraphQL endpoint: `http://localhost:8000/graphql`

GraphiQL IDE: <http://localhost:8000/wp-admin/admin.php?page=graphiql-ide>

---

### WordPress Constants

Inside `docker-compose.yml` there are several developer friendly constants you can enable to help with debugging. Feel free to add, remove, or change these values as needed.

```yml
# docker-compose.yml
WORDPRESS_DEBUG: 1 # Set to 0 to disable `WP_DEBUG`
WORDPRESS_CONFIG_EXTRA: |
  define('WP_CACHE', false);
  define('WP_DEBUG_DISPLAY', false);
  define('WP_DEBUG_LOG', false);
  define('WP_MEMORY_LIMIT', '256M');
  define('WP_ENVIRONMENT_TYPE', 'development');
  define('HEADLESS_FRONTEND_URL', '${HEADLESS_FRONTEND_URL}');
```

> If you change the default values, run `docker-compose up -d` to rebuild the containers.

---

### WP CLI

[WP-CLI](https://make.wordpress.org/cli/) is a command line interface for WordPress. It's a tool that makes it easy to manage WordPress sites.

First, tunnel into the `wpcli` container:

```bash
docker exec -it wpcli /bin/sh
```

Now you can run WP-CLI commands against your WordPress installation.

For example:

```bash
wp --info
```

Will return:

```bash
OS:     Linux 5.10.76-linuxkit #1 SMP PREEMPT Mon Nov 8 11:22:26 UTC 2021 aarch64
Shell:
PHP binary:     /usr/local/bin/php
PHP version:    7.4.28
php.ini used:
MySQL binary:   /usr/bin/mysql
MySQL version:  mysql  Ver 15.1 Distrib 10.6.4-MariaDB, for Linux (aarch64) using readline 5.1
SQL modes:
WP-CLI root dir:        phar://wp-cli.phar/vendor/wp-cli/wp-cli
WP-CLI vendor dir:      phar://wp-cli.phar/vendor
WP_CLI phar path:       /var/www/html
WP-CLI packages dir:
WP-CLI global config:
WP-CLI project config:
WP-CLI version: 2.6.0
```

See the full list of WP-CLI commands at: <https://developer.wordpress.org/cli/commands/>

---

### Composer

[Composer](https://getcomposer.org/) is a dependency manager for PHP. It makes it easy to manage your project's dependencies.

First, tunnel into the `composer` container:

```bash
docker exec -it composer /bin/sh
```

Now you can run Composer from inside the container.

For example, to validate the `composer.json`:

```bash
compeser validate
```

Will return:

```bash
./composer.json is valid
```

---

### phpMyAdmin

View the phpMyAdmin dashboard at <http://localhost:8080/>. No credentials are required.

---

## Docker Compose

The backbone of the backend is Docker Compose. Learn more at <https://docs.docker.com/engine/reference/commandline/compose/>

### Start Containers

Run the following command to start the containers back up:

```bash
docker-compose start
```

---

### Pause Containers

Run the following command to pause the containers:

```bash
docker-compose pause
```

---

### Stop Containers

Run the following command to stop the containers:

```bash
docker-compose stop
```

> Both MySQL and WordPress data _will_ persist when you stop the containers.

---

### Recreate Containers

If you've made changes to `docker-comper.yml` and you want to recreate the containers, run the following command:

```bash
docker-compose up -d
```

> Both MySQL and WordPress data _will_ persist when you recreate the containers.

---

### Destroy Containers

Need a fresh start? To destroy the containers _and_ the persistant data, run the following command:

```bash
docker-compose down --remove-orphans && rm -rf mysql wordpress
```

> Warning: This is a destructive operation! All WordPress data will be lost!

---

### Tunnel Into Containers

If you need to tunnel into a Docker container via the terminal, run the following command:

```bash
docker exec -it <container-name> /bin/sh
```

Where `<container-name>` is the name of the container you want to tunnel into. Here is the list of container names:

- `composer`
- `mysql`
- `phpmyadmin`
- `wordpress`
- `wpcli`

To exit a tunnel, type `exit` and press enter.

---

## Custom Post Types and Fields

The front-end has support for a "Books" custom post type and fields. This is just a simple example, so feel free to edit or remove as needed.

### Import Book CPT

1. Visit the CPT UI tools page: <http://localhost:8000/wp-admin/admin.php?page=cptui_tools>
2. Copy and paste the following JSON into the "Import Post Types" field:

   ```json
   {
     "book": {
       "name": "book",
       "label": "Books",
       "singular_label": "Book",
       "description": "",
       "public": "true",
       "publicly_queryable": "true",
       "show_ui": "true",
       "show_in_nav_menus": "true",
       "delete_with_user": "false",
       "show_in_rest": "true",
       "rest_base": "",
       "rest_controller_class": "",
       "has_archive": "false",
       "has_archive_string": "",
       "exclude_from_search": "false",
       "capability_type": "page",
       "hierarchical": "false",
       "rewrite": "true",
       "rewrite_slug": "",
       "rewrite_withfront": "true",
       "query_var": "true",
       "query_var_slug": "",
       "menu_position": "",
       "show_in_menu": "true",
       "show_in_menu_string": "",
       "menu_icon": "dashicons-book-alt",
       "supports": ["title", "editor", "thumbnail"],
       "taxonomies": [],
       "labels": {
         "menu_name": "My Books",
         "all_items": "All Books",
         "add_new": "Add new",
         "add_new_item": "Add new Book",
         "edit_item": "Edit Book",
         "new_item": "New Book",
         "view_item": "View Book",
         "view_items": "View Books",
         "search_items": "Search Books",
         "not_found": "No Books found",
         "not_found_in_trash": "No Books found in trash",
         "parent": "Parent Book:",
         "featured_image": "Featured image for this Book",
         "set_featured_image": "Set featured image for this Book",
         "remove_featured_image": "Remove featured image for this Book",
         "use_featured_image": "Use as featured image for this Book",
         "archives": "Book archives",
         "insert_into_item": "Insert into Book",
         "uploaded_to_this_item": "Upload to this Book",
         "filter_items_list": "Filter Books list",
         "items_list_navigation": "Books list navigation",
         "items_list": "Books list",
         "attributes": "Books attributes",
         "name_admin_bar": "Book",
         "item_published": "Book published",
         "item_published_privately": "Book published privately.",
         "item_reverted_to_draft": "Book reverted to draft.",
         "item_scheduled": "Book scheduled",
         "item_updated": "Book updated.",
         "parent_item_colon": "Parent Book:"
       },
       "custom_supports": "",
       "show_in_graphql": "1",
       "graphql_single_name": "Book",
       "graphql_plural_name": "Books"
     }
   }
   ```

3. Click the "Import" button.

---

### Import Book Custom Fields

1. Visit the ACF tools page: <http://localhost:8000/wp-admin/edit.php?post_type=acf-field-group&page=acf-tools>
2. Under the Import settings, click "choose file" and select `backend/acf-export.json`
3. Click the blue "Import" button

---
