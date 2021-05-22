# **ARCND**

## **Study game project**
Powered by  :sparkles:__NAIROBI CREW__:sparkles:
### :zap:DEVS:
* Николай Сидоров
* Олег Белоновский
* Александр Степанов
<hr>

### URL's:
* [ARCND](https://nairobi-arcnd.ya-praktikum.tech)
<hr>


## **Игра Арканоид** *классический*
####Выполнена без использования растровой графики

### :floppy_disk:INSTALLATION:
1) Клонировать репозиторий к себе локально `git clone https://github.com/Praktikum-game/game.git`
2) Установить зависимости `npm i`
3) Для __разработки__ `npm run ssr-start` | __продакшн деплоя__ `npm run build && npm run start`
4) Для деплоя в Docker-е выполнить команду сборки: __docker-compose build__, для запуска: __docker-compose up__
> при __деплое__, в проект нужно добавить **.env**
5) Настройки игрового процесса находятся в [файле](src/components/Arcanoid/settings.ts)
<hr>

### STRUCTURE:
```
|__public/
|     |__index.html
|
|
|__src/
|   |__blocks/
|   |__common/
|   |__components/
|   |     |__Arcanoid/
|   |     |__ui/
|   |__config/
|   |__Pages/
|   |__services/
|   |__styles/
|   |__util/
|   |__App.tsx
|   |__index.tsx
|
|__.babelrc
|__.editorconfig
|__.eslintrc.json
|__package.json
|__webpack.config.js
|__e.t.c...

```

