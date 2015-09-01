# Тестовое задание


Онлайн демонстрация: http://anotherworkman.github.io/test1/

Также можно скачать исходники и запустить локально:

```
git clone https://github.com/anotherworkman/test1.git
cd test1
npm install local-web-server
npm start
```
Страница будет доступна по адресу: http://localhost:8000/

Для пересборки проекта с помощью `webpack` можно использовать одну из команд:
* `npm run pack`
* `npm run pack-watch` — режим отслеживания изменений
* `npm run pack-prod` — упаковка с оптимизацией и сжатием пакета

Перед этим не забыть установить все зависимости: `npm install`

## Технически подробности

### ES2015

Демонстрируются возможности ECMA Script 2015 — модули, классы, инлайн-функции. Используется компилятор `Babel`.

### Компонентный подход

Элементы пользовательского интерфейса выделены в `React` компоненты с соответствующими стилевыми `bem` блоками.

### Внешние библиотеки

* [React Router](http://rackt.github.io/react-router/) — для обработки навигации между страницами
* [React Date Picker](http://zippyui.com/react-date-picker/) — виджет для выбра даты
* [xhr-json](https://github.com/nathan7/xhr-json)
* [es5-shim](https://github.com/es-shims/es5-shim) — для поддержки ie8
