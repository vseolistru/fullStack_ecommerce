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
также для диспетчера useReducer утановим logger для отслеживания изменения состояния `npm i use-reducer-logger --force`


установим бутстрап `npm i react-bootstrap bootstrap react-router-bootstrap`


Для заголовка **(title)** используем `npm i react-helmet-async` для его использования создадим провайдер **HelmetProvider** в index.js



## Server: 

Инициализируем server `npm init -y`

Устанавливаем `npm i express mongoose cors dotenv`, `npm i nodemon --save-dev`

В package.json добавляем `"start": " nodemon index.js"` для автозапуска сервера и `"type": "module",` для импорта, вместо реквайра.

Для шифрования пароля установим bcrypt `npm i bcryptjs`

Установим для обработки ошибок JWT token `npm i express-async-handler`

Установим JWT `npm i jsonwebtoken`

