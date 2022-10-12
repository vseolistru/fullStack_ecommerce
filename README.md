# new fullstack ecommerce app 

## Client:
создаем новый реакт проект : `npx create-react-app .` 

создаем моковые данные в  data.js

добавляем router-dom `npm i react-router-dom`

в ProductScreen получаем slug из dom hook useParams

чтоб ререндера при переходе не было используем **Link** вместо **a** 

для использования энвайрмента `npm i env-cmd` 


**to package: "start": "env-cmd -f .env react-scripts start"**

или используем proxy в package `"proxy":" http://localhost:$port"`, таким образом спрячем наш бекэнд через прокси
в панеле XHR dev-tools браузера, можем убедится что наш бекэенд не светится, и также увидим response с сервера через прокси.
 
устнаовим **axios** `npm i axios`



## Server: 

инициализируем server `npm init -y`

устанавливаем `npm i express mongoose cors dotenv`, `npm i nodemon --save-dev`

в package.json добавляем `"start": " nodemon index.js"` для автозапуска сервера и `"type": "module",` для импорта, вместо реквайра 
