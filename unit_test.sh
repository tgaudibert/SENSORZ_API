#docker-compose up

npm run-script destroy
npm run-script migrate
npm run-script seed

npm run-script test
