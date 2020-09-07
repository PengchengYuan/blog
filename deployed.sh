git pull origin master
yarn install
cd /front/
yarn install
yarn build
cd ../
pm2 restart blog