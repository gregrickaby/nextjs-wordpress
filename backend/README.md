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
  - [Pause Containers](#pause-containers)
  - [Stop Containers](#stop-containers)
  - [Start Containers](#start-containers)
  - [Recreate Containers](#recreate-containers)
  - [Destroy Containers](#destroy-containers)
  - [Tunnel Into Containers](#tunnel-into-containers)

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
  define('HEADLESS_FRONTEND_URL', 'http://localhost:3000');
```

> If you change the default values, run `docker-compose -f docker-compose.yml up -d --no-recreate` to restart the containers.

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

### Pause Containers

Run the following command to pause the containers:

```bash
docker-compose pause
```

---

### Stop Containers

Run the following command to stop the containers:

```bash
docker-compose down
```

> Both MySQL and WordPress data _will persist_ when you stop the containers.

---

### Start Containers

Run the following command to start the containers back up:

```bash
docker-compose up -d --no-recreate
```

---

### Recreate Containers

If you've made changes to `docker-comper.yml` and you want to recreate the containers, run the following command:

```bash
docker-compose up -d
```

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
