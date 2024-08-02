sudo su

apt-get update -y
curl -fsSL https:// get.docker.com -o get-docker.sh
sh get-docker.sh
docker run -d -p 27017:27017 -v $(pwd)/mongodb/db:$(pwd)/data/db -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin --name mongoStage mongo