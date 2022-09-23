# Development <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Next.js Development](#nextjs-development)
- [Managing The WordPress Stack](#managing-the-wordpress-stack)
  - [GraphQL](#graphql)
  - [WordPress Constants](#wordpress-constants)
  - [WP CLI](#wp-cli)
  - [Composer](#composer)
  - [phpMyAdmin](#phpmyadmin)
  - [Traefik](#traefik)
- [Up Next](#up-next)

## Next.js Development

Start the development server on <http://localhost:3000>

```bash
npm run dev
```

Lint the codebase:

```bash
npm run lint
```

## Managing The WordPress Stack

### GraphQL

GraphQL endpoint: `https://headlesswp.test/graphql`

GraphiQL IDE: <https://headlesswp.test/wp-admin/admin.php?page=graphiql-ide>

---

### WordPress Constants

Inside `docker-compose.yml` there are several developer friendly constants you can enable to help with debugging. Feel free to add, remove, or change these values as needed.

```yml
# docker-compose.yml
WORDPRESS_DEBUG: 1 # Set to 0 to disable `WP_DEBUG`
WORDPRESS_CONFIG_EXTRA: |
  define('WP_CACHE', false);
  define('WP_DEBUG_DISPLAY', false);
  define('WP_DEBUG_LOG', true);
  define('WP_MEMORY_LIMIT', '256M');
  define('WP_ENVIRONMENT_TYPE', 'development');
  define('HEADLESS_FRONTEND_URL', '${HEADLESS_FRONTEND_URL}');
  define('PREVIEW_SECRET_TOKEN', '${PREVIEW_SECRET_TOKEN}');
  define('WP_SITEURL', 'https://${WORDPRESS_URL}');
  define('WP_HOME', 'https://${WORDPRESS_URL}');
```

> If you change the default values, run `docker-compose up -d` to rebuild the containers.

---

### WP CLI

[WP-CLI](https://make.wordpress.org/cli/) is a command line interface for WordPress. It's a tool that makes it easy to manage WordPress sites.

First, tunnel into the `wpcli` container:

```bash
docker exec -it backend-wpcli-1 /bin/sh
```

Now you can run WP-CLI commands against your WordPress installation.

For example:

```bash
wp --info
```

Will return:

```bash
OS:     Linux 5.10.124-linuxkit #1 SMP PREEMPT Thu Jun 30 08:18:26 UTC 2022 aarch64
Shell:
PHP binary:     /usr/local/bin/php
PHP version:    8.0.23
php.ini used:
MySQL binary:   /usr/bin/mysql
MySQL version:  mysql  Ver 15.1 Distrib 10.6.9-MariaDB, for Linux (aarch64) using readline 5.1
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
docker exec -it backend-composer-1 /bin/sh
```

Now you can run Composer from inside the container.

For example, to validate the `composer.json`:

```bash
composer validate
```

Will return:

```bash
./composer.json is valid
```

---

### phpMyAdmin

View the phpMyAdmin dashboard at <http://localhost:8081/>. No credentials are required.

---

### Traefik

View the Traefik dashboard at <http://localhost:8080/dashboard/>. No credentials are required.

---

## Up Next

Learn more about [Managing Docker](docker.md)

---
