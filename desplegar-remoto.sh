rm -rf build
rm -rf dist
yarn run build
gulp war
scp ModeloPredictivoLeyUrgencia.war pcarrasco@10.6.221.140:/home/pcarrasco
ssh pcarrasco@10.6.221.140 "/home/pcarrasco/DEPLOY_WCP.sh ModeloPredictivoLeyUrgencia.war"
