# ЕГИП


## Links

- [JIRA modules](https://gost-jira.atlassian.net/browse/DITEGIPDEV-775)

- [Design](https://app.zeplin.io/project/5a8ac12b28f91ab4567b2b33/screen/5aba0377ff2af0bc41f52935)

- [Релизы](https://docs.google.com/spreadsheets/d/194YPgnJyeFwQpSt2RItnldkY9gUKhKcL4y3fyobucSc/edit#gid=1542029153)

- [REST API](https://gost-jira.atlassian.net/wiki/spaces/EGIPAPIDOC/pages/436699311/API)

- [http://egiptest.gost-group.com/egip-client/](http://egiptest.gost-group.com/client/)

  login: `sys`, password: `123456`

- [http://egiptest.gost-group.com/jsapi/docs](http://egiptest.gost-group.com/jsapi/docs)

## Built With

- [**`TypeScript`**](https://www.typescriptlang.org/)
- [**`React`**](https://reactjs.org/)
- [**`Ant Design`**](https://ant.design/)
- [**`Styled Components`**](https://www.styled-components.com/)
- [**`Webpack`**](https://webpack.js.org/)
- [**`Openlayers`**](https://https://openlayers.org/)
- [**`Lerna`**](https://github.com/lerna/lerna)
- [**`Recompose`**](https://github.com/acdlite/recompose)
- [**`Redux`**](https://redux.js.org/), [**`Redux-Saga`**](https://redux-saga.js.org), [**`Dva`**](https://github.com/dvajs/dva)

## Development  `client`

  * используйте `dev` branch

  - install `nodejs`, `npm`

```shell
  # in root directory
  git checkout https://bitbucket.org/gostgroup/egip-frontend
  cd egip-frontend
  git checkout develop
  npm i
  npm run dev
  sh run.sh dist # once
  sh run.sh dev
```
## Production  `build`
```shell
  sh run.sh dist # once
  # or
  npm run build
```

  * клиент доступен на localhost:3000


## Модули

* В целом: большая часть модулей взаимодествет с картой. после инициализации  карты в приложении, она передается в модули в файле `routes/gis/index.tsx`
* Модули связаны между собой только через store приложения: `redux`
* На примере комопнента *Маршруты* `components/routes` можно увидеть общий принцип: модуль получает карту, подписывается на events, добавляет    элементы ui + слои на карту, при willUnmount удалят с карты свои слои.
* каждый модуль подключается в `routes/gis.tsx` , используя ErrorBoundary: не пропустите этот момент, чтобы приложение всегда
  функционировало независимо от module failure
* уточняйте "так или не так", "можно/нельзя" у аналитиков проекта, всегда можно прийти к более оптимальному варианту, если в постановке
  что-то противоречит data flow inside the module, вы видите вариант лучше
* см. [JIRA modules](https://gost-jira.atlassian.net/browse/DITEGIPDEV-775)

## Links

 - recompose

    - https://github.com/acdlite/recompose/blob/master/docs/API.md#componentfromstream
    - https://www.youtube.com/watch?v=zD_judE-bXk

 - use functional techinques if possible
    - https://github.com/MostlyAdequate/mostly-adequate-guide
    - https://staltz.com/some-problems-with-react-redux.html
    - https://david-peter.de/cube-composer/
    - https://cycle.js.org/streams.html
    - http://buzzdecafe.github.io/code/2014/05/16/introducing-ramda
    - https://www.youtube.com/watch?v=m3svKOdZijA
    - https://github.com/lodash/lodash/wiki/FP-Guide
    - https://gist.github.com/vvgomes/451ea5ca2c65e87c92e4
    - http://fr.umio.us/favoring-curry/
    - http://randycoulman.com/blog/categories/thinking-in-ramda/
    - http://worrydream.com/refs/Backus-CanProgrammingBeLiberated.pdf

 - styled-components
    - https://github.com/styled-components/styled-components/pull/1798

 - React.Component state with TS > 2.9.2
    - https://stackoverflow.com/questions/51074355/cannot-assign-to-state-because-it-is-a-constant-or-a-read-only-property

Для автоматической генерации типов для моделей бэкэнда используется программа `swagger-codegen`.
Устанавливаем [программу на свою машину](https://github.com/swagger-api/swagger-codegen#prerequisites) и далее через npm-скрипт запускаем генерацию моделей для нашего API (типы будут сгенерированны в папку `src/app/swagger`):

Пока не получилось победить подключение к https://188.127.226.173/docs/api/v2/api-docs из генератора - в src/app/  лежит скачанный с этого урла swagger.json. Пока типы генерируем на основе файла.