docker build -t snoopy/front:latest .
docker stop snoopy-front-proxy
docker rm snoopy-front-proxy
docker run -d --name snoopy-front-proxy -p 80:3000 snoopy/front:latest


