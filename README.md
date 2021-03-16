#Установка

1. Установить NodeJs
2. Из дериктории с сервером в терминале набрать следующие команды
```shell
npm i
```
```shell
node app.js
```

#Endpoints
1. Загрузка файлов
```http request
POST http://localhost:2121/upload
```
Тело запроса в формате Form Data с полем files.
Пример ответа от сервера
```http request
Upload completed.
```
2. Получение ссылок на файл
```http request
GET http://localhost:2121/files
```
Пример ответа от сервера
```json
[
    "http://localhost:2121/uploads/IMG_0002.JPG"
]
```

##Пример использования ссылок в разметке
```html
<img src="http://localhost:2121/uploads/IMG_0002.JPG" alt="">
```
