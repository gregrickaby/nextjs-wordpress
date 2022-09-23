# Setup <!-- omit in toc -->

The following will help you setup Next.js WordPress.

## Table of Contents <!-- omit in toc -->

- [Requirements](#requirements)
- [Next.js Setup](#nextjs-setup)
  - [Install](#install)
  - [ENV Variables](#env-variables)
- [WordPress Setup](#wordpress-setup)
  - [Install](#install-1)
  - [1) Copy ENV Variables](#1-copy-env-variables)
    - [Customize ENV Variables (optional)](#customize-env-variables-optional)
  - [2) Run Install Script](#2-run-install-script)
  - [3) Log into WordPress](#3-log-into-wordpress)
  - [4) Create Application Password](#4-create-application-password)
  - [5) Import ACF Fields Groups](#5-import-acf-fields-groups)
- [Custom Post Types and Fields](#custom-post-types-and-fields)
  - [Import Book CPT](#import-book-cpt)
  - [Import Book Custom Fields](#import-book-custom-fields)
- [Up Next](#up-next)

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Node v16
- NPM v8

## Next.js Setup

### Install

```bash
npx create-next-app nextjs-wordpress --example https://github.com/gregrickaby/nextjs-wordpress
```

### ENV Variables

Copy `.env.sample` to `.env`

```bash
cp .env.sample .env
```

That's it for Next.js. You're ready to move on to the WordPress setup.

---

## WordPress Setup

All CLI commands must be run from inside the `/backend` directory. [Docker Desktop](https://www.docker.com/products/docker-desktop) needs to be running as well.

---

### Install

### 1) Copy ENV Variables

From inside the `/backend` directory, run the following command:

```bash
cp .env.sample .env
```

#### Customize ENV Variables (optional)

This step can be done at a later time. Open the `.env` file in your code editor and customize the following values to meet your needs:

```text
# The WordPress URL (no http//https!)
WORDPRESS_URL="headlesswp.test"

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
PREVIEW_SECRET_TOKEN="wordpress"
```

Save the the `.env` file.

---

### 2) Run Install Script

From inside the `/backend` directory, run the following command:

```bash
chmod +x install.sh && ./install.sh
```

This script pulls down and starts each container. Composer will download the required plugins, WordPress will be configured, and finally the script add an entry to your host file.

> Note: You will be prompted to enter your password so the script can edit your `/etc/hosts` file

---

### 3) Log into WordPress

View the WordPress dashboard at: <https://headlesswp.test/wp-admin/>

- username `wordpress`
- password `wordpress`

> Use the credentials above, unless you've customized the `WORDPRESS_USERNAME` and `WORDPRESS_PASSWORD` variables in the `.env` file.

---

### 4) Create Application Password

In order for Next.js to `POST` comment and reaction data back to WordPress, it needs to authenticate using an application password.

1. Navigate to your Profile page in the WordPress dashboard under `Users --> Profile`
2. Scroll down to the Application Password section
3. Type any name to the New Application Password Name field
4. Click the "Add New Application Password" button: ![screenshot of how to add a new application password username](https://uc8255a7ddb611894d0838f0d061.previews.dropboxusercontent.com/p/thumb/ABqIUrsHCxhE68mHWLMaszmvi29KA6DS07HIVNXHcDqAYtqJBueODBCNoY8cnVkxwHP3ngJTuHSZtj3ONVGHt9eSc8TEjlsFY7BVylQHvgMkXoJInUJIFZHVTTOXz8grtX9LOdW0ZsIkB54b9HvwPvWKdNe-7be7M6uUkP0gOz6Nw_82FoSn0EEzOuHr14n1a9eCzBCLLR1-C8Dde1FPGzB-5WOzjs8uJyCM4VlbKCj4QLOySNrLHzKZ7L_6EHp_RSyivH4ggLIQeQNPzHZkHJsyGnyQQN-nCamMJWrLWUpPXr8_Xzq5NCcRuqonD6TnEOFjfzaH6FNYxFMBNw7vskg0_is7H-FfPquIYJjzYAo1e54qbF38QR6vYNG7ZHPYlTa3cMV0qLJZpzKLN9ARfeuK/p.png)
5. Copy the password that was generated and paste into `.env`: ![screenshot of new application password](https://uc815edbebefa34f9dc4d1e9a9a0.previews.dropboxusercontent.com/p/thumb/ABq6wlKtHrWXNel-aoGj-W4cFjM4E-U86-0R9N2XdEPyiAJALsMqNkT7IS5CA5NQXlsEc9quLI_Sc5b5v1X6r-72wkOP9kb9ylSelZnv98WCe5ulbAEcYHpa_SUcDk6-UiqTB4b9qC5VwPQDMD4dFqt449GUW2o7tPfRp4oxXWsg85-2Lq-BtTqlXTJLH8rKvGGbkz9M2QCBf6FQ_h_AJWc19n98BJs_lt65F9_AGBZ_sXH8iJiNdbpoTNilzCeSSPOfMJX2ucfuHYJDFYARIJdCQq80pXUSFPMi6O82H3m4mfApxCjJuD_X-4ckYOjyC-gdNjgByimVkVrAkMHHTsOoQmrbjPDmM6iLteVhVdx2srFH2f4Ia1BSPZdv8IfKdKIsucM79LHyBligkVGrIHjm/p.png)
6. Open the `.env` file in the _root_ of this project
7. Paste the Application Password next to the `WORDPRESS_APPLICATION_PASSWORD` key: ![screenshot of the application password in the ENV file](https://uc14bb8530922af390ada64ecdcc.previews.dropboxusercontent.com/p/thumb/ABpxonLEsSWJkhS__ckgACbenTpfHi9rim1FLJsUaSl5l4xmwVr7Q7yAArc7mUF9a0lYc5HrzRph8ecx-aE14XgrwKUyTnrcM5JRUHWzfZxpsV8WvMiJRvRqj1f_wsTVJKqq8dmO-IXRyzU7YVVjOTzSNzyebAM30dJ3_5Eh65lSKLbSUPbJRwRoM_PD8Porh3bzV-pvSbScxn3yr-dHeSh3QSUJiv4cLLj-JpfjTyqh9rDOjyMi1-AYx_SyEy1TT7I3HJdnH_nUXF7gUpD3pgCtMZ1PR9ROUcE-_miG6wBf0dcFghthLr-0EWXnJpPSy4WYC30Cs643m0fBtPULq0TzlXHU70_lY22lvPU8g-_tM_k2F1xIL1kpMqMgCPznk2DM-Lviyvggs3NDwTmXUeR0/p.png)

---

### 5) Import ACF Fields Groups

In order for post reactions to work, you'll need to import the ACF fields.

1. Navigate to the WordPress dashboard under `Custom Fields --> Tools`
2. Under "Import Field Groups" click the "Choose File" button and select the `acf-export-post-fields.json` file from the `/backend` directory: ![screenshot of how to import field groups](https://uc35545d55f151f85536ef38cacc.previews.dropboxusercontent.com/p/thumb/ABrS9oMwMtYF2N9eErOY3UOgjGVDpsy5rGY--tY2ruJiTmq7QKQidZFZpJq-veTQAWjS6ZZ0nqlnacyramnFArnjFQvabhMxHg0sogwQAS4kp0HVTa7pCoIPvPUFRLj8DkFsMw-Ob3soP9jo4LjkGUD_KcD8PZYYOisW3kTKNk1ztIUI1xknAsMNUP8uVzo-AYKOBxBeO-N0KqSooqAw1XONMjHdnVZ845Q4x5c6teWa-j7B9uqA-ew1zEd0oL4mUQyYeIKIoXGLykMFMhbOs9quO2nuBNVFxCXIjrfSlfshxavCTyo72bo2nNLDTjvl00YflgdH2ijc3DPBB5Ruve8Lnj6prG1599JjqAIj2_kU2uNKaUjMoWIyGUsSjCBW6iw74j4DLfxZuPR3w6RiWbFg/p.png)
3. Click the "Import JSON" button

That's it! WordPress should now be setup and ready to go.

---

## Custom Post Types and Fields

The front-end has support for a "Books" custom post type with custom fields. This is just a simple example, so feel free to edit or remove as needed.

### Import Book CPT

1. Visit the CPT UI tools page: <https://headlesswp.test/wp-admin/admin.php?page=cptui_tools>
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
       "rest_namespace": "",
       "has_archive": "false",
       "has_archive_string": "",
       "exclude_from_search": "false",
       "capability_type": "page",
       "hierarchical": "false",
       "can_export": "false",
       "rewrite": "true",
       "rewrite_slug": "",
       "rewrite_withfront": "true",
       "query_var": "true",
       "query_var_slug": "",
       "menu_position": "",
       "show_in_menu": "true",
       "show_in_menu_string": "",
       "menu_icon": "dashicons-book-alt",
       "register_meta_box_cb": null,
       "supports": ["title", "editor", "thumbnail", "custom-fields"],
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
       "enter_title_here": "",
       "show_in_graphql": "1",
       "graphql_single_name": "Book",
       "graphql_plural_name": "Books"
     }
   }
   ```

3. Click the "Import" button.

---

### Import Book Custom Fields

1. Visit the ACF tools page: <https://headlesswp.test/wp-admin/edit.php?post_type=acf-field-group&page=acf-tools>
2. Under the Import settings, click "choose file" and select `backend/acf-export-cpt-fields.json`
3. Click the blue "Import" button

---

## Up Next

Learn more about [Local Development](development.md).
