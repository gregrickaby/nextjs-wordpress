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

echo -e "👋 Hello, I am going to setup WordPress for you."
sleep 2

echo -e "Reading ENV vars..."
source .env
sleep 2

echo -e "Setting up Docker...this may take a few minutes!"
docker compose up -d
sleep 2

docker exec -it backend-wpcli-1 bash -c "chmod +x wordpress.sh && ./wordpress.sh"

echo -e "Updating hosts file. You will be prompted for a password!"
sleep 2
echo "127.0.0.1 ${WORDPRESS_URL}" | sudo tee -a /etc/hosts
sleep 2

echo -e "Installation is complete! 🔥"
sleep 2

echo -e "Visit https://${WORDPRESS_URL}/wp-admin to log into WordPress."
sleep 1

echo -e "username: ${WORDPRESS_USERNAME}"
echo -e "password: ${WORDPRESS_PASSWORD}"
exit 0
