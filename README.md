# **ARCND**

## **Study game project**
Powered by  :sparkles:__NAIROBI CREW__:sparkles:
### :zap:DEVS:
* Николай Сидоров
* Олег Белоновский
* Александр Степанов
<hr>

### URL's:
* [ARCND](https://nairobi-arcnd-4.ya-praktikum.tech/)
<hr>

## **Игра Арканоид** *классический*
####Выполнена без использования растровой графики

###Использованное Web API:
1. [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
2. [Console API ;)](https://developer.mozilla.org/en-US/docs/Web/API/Console_API)
3. [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
4. [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
5. [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API)
6. [Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)
7. [Service Worker API](https://developer.mozilla.org/ru/docs/Web/API/Service_Worker_API)
8. [TouchEvents API](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
9. [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)
10. [WEB Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

####В проекте настроено [CI](.github/workflows/CI.yml)/[CD](.github/workflows/CD.yml) при помощи [Github Actions](https://github.com/features/actions)
####Тестирование компонент: [Jest](https://jestjs.io)/[Enzyme](https://enzymejs.github.io/enzyme)
####Доска в [Trello](https://trello.com/b/NVMJzxq2/the-game)
Работа тестировалась на актуальных версиях браузеров:
1. Chrome
2. Firefox (Убрана отрисовка теней объектов из-за падения произодительности в 50 раз :( )
3. Safari

##Управление
###Ракетка влево-вправо:
####Клавиатура - стрелками
####Геймпад - любой осью
####Для устройств с тачскрином - тач на леваой-правой половине экрана
###Выстрел/сброс шарика
####Клавиатура - пробел
####Геймпад - любая кнопка
####Тачскрин - свайп вверх


### :floppy_disk:INSTALLATION:
1) Клонировать репозиторий к себе локально `git clone https://github.com/Praktikum-game/game.git`
2) Установить зависимости `npm i`
3) Для __разработки__ `npm run ssr-start` | __продакшн деплоя__ `npm run build && npm run start`
4) Для деплоя в Docker-е выполнить команду сборки: __docker-compose build__, для запуска: __docker-compose up__
> при __деплое__, в проект нужно добавить **.env**
5) Настройки игрового процесса находятся в [файле](src/components/Arcanoid/settings.ts) и сопровождены комментариями
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

