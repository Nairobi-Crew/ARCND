# **ARCND**

## **Study game project**
Powered by  :sparkles:__NAIROBI CREW__:sparkles:
### :zap:DEVS:
* Николай Сидоров
* Олег Белоновский
<hr>

### URL's:
* [ARCND](https://nairobi-arcnd-4.ya-praktikum.tech/)
<hr>

## **Игра Арканоид** *классический*
####Выполнена без использования растровой графики

##Об игре
Отбивая шарик ракеткой разбить все блоки<br>
На прохождение игры есть 3 "**жизни**"<br>
Блоки бывают [1-9] уровней. В текущем конфиге - 5. Для добавления нужно в массив со стилями [brickColors](src/components/Arcanoid/settings.ts) добавить элементы или же блоки выше N-го уровня будут использовать один и тот же стиль.
Каждый уровень имеет свой цвет, и для того чтобы разбить блок уровня [N] необходимо попасть в него шариком [N] раз. Однако, при проверке геймплея была выявлена ошибка, неверная проверка столкновения шарика с блоком. При попадании в "угол" уровень уменьшался на 2, и могло выпасть 2 бонуса. Решили применить старую и секретную технологию превращения бага в фичу ).
При попадании шариком из блока может вылететь "**бонус**". Изменяя константу [THING_SHOW_TYPE](src/components/Arcanoid/settings.ts) управляем отображением типа бонуса на блоке.
<br>**Бонусы бывают:**<br>
  - Клей. Если количество шариков = 1, то он приклеивается к ракетке, позволяя прицеливаться для следующего удара. Количество приклеиваний указано в константе [GLUE_QTY](src/components/Arcanoid/settings.ts). Отрицательное число - бесконечно много ;)
  - Пушка. Позволяет стрелять в блоки вертикально вверх. Количество выстрелов ограничивается константой [SHOOT_QTY](src/components/Arcanoid/settings.ts). Отрицательное число-бесконечно много. Минимальный интервал между выстрелами - [SHOOT_INTERVAL](src/components/Arcanoid/settings.ts). Скорость полета "пули" - [SHOOT_SPEED](src/components/Arcanoid/settings.ts).
  - Сужение ракетки. Ракетка сужается на 10%. Бонус работает до смены уровня или уменьшение количества "жизней".
  - Расширение ракетки. Ракетка расширяется на 10%. Бонус работает до смены уровня или уменьшение количества "жизней".
  - Разделение шарика. Количество разделений - [SPLIT_QTY](src/components/Arcanoid/settings.ts). Если параметр [SPLIT_ALL_BALLS](src/components/Arcanoid/settings.ts) = true, разделяются все шарики, иначе только один.
  - Огненный шар. [FIREBALL_TIME](src/components/Arcanoid/settings.ts) мс шарик, не меняя направление об блок разбивает их, вне зависимости от уровня
  - и случайный бонус. С вероятностью 50% выпадает 1 из предыдущих бонусов


##Использованное Web API:
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
11. [WEB Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

###В проекте настроено [CI](.github/workflows/CI.yml)/[CD](.github/workflows/CD.yml) при помощи [Github Actions](https://github.com/features/actions)
##Тестирование компонент: [Jest](https://jestjs.io)/[Enzyme](https://enzymejs.github.io/enzyme)
##Доска в [Trello](https://trello.com/b/NVMJzxq2/the-game)
Работа тестировалась на актуальных версиях браузеров:
1. Chrome
2. Firefox (Убрана отрисовка теней объектов из-за падения производительности в 50 раз :( )
3. Safari

##Управление
###Ракетка влево-вправо:
###Клавиатура - стрелками
###Геймпад - любой осью
###Для устройств с тачскрином - тач на левой-правой половине экрана
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

