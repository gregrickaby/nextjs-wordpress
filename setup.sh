#!/bin/bash
#Setup Development Environment

echo -e "Let's quickly setup your development environment:"

#1 - Do you have Docker Desktop installed?
read  -p "Do you have Docker Desktop installed and is it currently running? Y/n " IS_DOCKER_DESKTOP_INSTALLED
case $IS_DOCKER_DESKTOP_INSTALLED in
	[yY] | "" ) ;;
	[nN] ) echo 'Please install Desktop Docker before continuing https://www.docker.com/products/docker-desktop/';
		exit;;
	* ) echo $IS_DOCKER_DESKTOP_INSTALLED is an invalid response, please enter y or n;
		exit 1;;
esac

#2 - Do you have Node installed?
read  -p "Do you have Node installed? Y/n " IS_NODEJS_INSTALLED
case $IS_NODEJS_INSTALLED in
	[yY] | "" ) ;;
	[nN] ) echo 'Please install Node before continuing https://nodejs.org/en/';
		exit;;
	* ) echo $IS_NODEJS_INSTALLED is an invalid response, please enter y or n;
		exit 1;;
esac

#2 - Do you have Composer installed?
read  -p "Do you have Composer installed? Y/n " IS_COMPOSER_INSTALLED
case $IS_COMPOSER_INSTALLED in
	[yY] | "" ) ;;
	[nN] ) echo 'Please install Composer before continuing https://getcomposer.org/download/';
		exit;;
	* ) echo $IS_COMPOSER_INSTALLED is an invalid response, please enter y or n;
		exit 1;;
esac

#3 - Copy ENV file:
cd ./apps/nextjs && cp .env.sample .env.local

#4 - Install Next.js:
echo Installing dependencies...
cd ../.. && npm i && composer install

#5 - Install WordPress (Docker Desktop must be running):
cd ./apps/wordpress/config && chmod +x install.sh && ./install.sh

#6 - Import ACF Fields:
echo -e '\nPlease import ACF Fields:
         1 - Log into WordPress http://localhost:8888/wp-admin/ (admin/password)
         2 - Go to Custom Fields --> Tools --> Import Field Groups
         3 - Click "Choose File"
         4 - Select apps/wordpress/.config/acf-post-fields.json
         5 - Click "Import JSON"
         6 - Click "Choose File"
         7 - Select apps/wordpress/.config/acf-cpt-fields.json
         8 - Click "Import JSON"  \n'

read  -p "Press [Enter ↩] when you have completed the steps listed above." HAS_IMPORTED_ACF

if [[ "$HAS_IMPORTED_ACF" == "" ]]
then
 cd ../../ && npm run dev
fi

exit 0
