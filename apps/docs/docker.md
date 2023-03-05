# Docker <!-- omit in toc -->

The backbone of the backend is Docker Compose. Learn more at <https://docs.docker.com/engine/reference/commandline/compose/>

> Note: The following commands must be run from the `/apps/wordpress/` directory.

## Table of Contents <!-- omit in toc -->

- [Start Containers](#start-containers)
- [Pause Containers](#pause-containers)
- [Stop Containers](#stop-containers)
- [Recreate Containers](#recreate-containers)
- [Destroy Containers](#destroy-containers)
- [Tunnel Into Containers](#tunnel-into-containers)
- [Up Next](#up-next)

## Start Containers

Run the following command to start the containers back up:

```bash
docker compose start
```

---

## Pause Containers

Run the following command to pause the containers:

```bash
docker compose pause
```

---

## Stop Containers

Run the following command to stop the containers:

```bash
docker compose stop
```

> Both MySQL and WordPress data _will_ persist when you stop the containers.

---

## Recreate Containers

If you've made changes to `docker compose.yml` and you want to recreate the containers, run the following command:

```bash
docker compose up -d
```

> Both MySQL and WordPress data _will_ persist when you recreate the containers.

---

## Destroy Containers

Need a fresh start? To destroy the containers, persistant data, and composer packages, run the following command:

```bash
docker compose down --volumes && rm -rf wp-content/plugins wp-content/themes wp-content/uploads wp-content/mu-plugins wp-content/vendor wp-content/composer.lock
```

> Warning: This is a destructive operation! All data will be lost!

Now you can re-run `sh install.sh` to start fresh. Note: You'll need to do the [Manual Setup](https://github.com/gregrickaby/nextjs-wordpress/blob/main/apps/docs/setup.md#manual-setup-wordpress) again.

---

## Tunnel Into Containers

If you need to tunnel into a Docker container via the terminal, run the following command:

```bash
docker exec -it nextjs-wordpress-<container-name>-1 /bin/sh
```

Where `<container-name>` is the name of the container you want to tunnel into. Here is the list of container names:

- `composer`
- `mysql`
- `phpmyadmin`
- `wordpress`
- `wpcli`

To exit a tunnel, type `exit` and press enter.

---

## Up Next

Learn more about [Contributing](/CONTRIBUTING.md)

---
