# mesto-react

![logo_white](src/images/logo/logo_black.png)&ensp;<img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" width="40px">&ensp;![logo_black](src/images/logo/logo.svg)
<img src="https://github.com/ds-sev/mesto-react/blob/main/src/images/mesto-react_preview.png" width="380px" align="right">


📝 **ТЗ:**

* Портирование ранее созданного проекта Место на "Реакт"

⚙️ **Описание проекта:**

Проект Mesto - сайт, где пользователь может просматривать свои и загруженные другими людьми изображения, ставить или
убирать реакции к понравившемуся контенту. Пользователь может редактировать свою информацию, включая имя, род занятий
и аватар. Также, есть возможность удалять с сервера свои изображения. Для всех полей ввода в формах присутствует
валидация с проверкой введенных данных и подсказками об ошибках на случай некорректного заполнения. Верстка адаптивная
и выглядит лаконично и в едином стиле как на больших мониторах, так и на экранах смартфонов с малой диагональю. Код разбит на модули
и может быть легко масштабирован.

🛠️ **Примененные технологии:**

* HTML (структура, верстка, семантика)
* CSS (стилизация, позиционирование, трансформации)
* Flexbox
* Grid-layout
* БЭМ-методология (Nested BEM)
* JavaScript (Асинхронный JS, ООП, работа с сервером, запросы API)
* Валидация форм с использованием JS
* настройка и сборка Webpack
* Babel
* Git
* Создание нового проекта с помощью Create React App
* Конвертирование нативного HTML-кода в JSX
* React: Разбивка кода на компоненты и последующая работа с ними
* Хуки: useState, useEffect

🪛 **UPD 15.03.2023. ПР11: портирование и работа с API:**
* Работа с контекстом пользователя. Доступ к его данным компонентов приложения.
* Работа со стейтами
* Вынесены формы в отдельные компоненты
* Использование рефа в форме редактирования аватара
* Добавлен попап подтверждения удаления карточки
* Добавлено изменение названия кнопок при отправке данных
* Реализована валидация форм редактирования профиля и добадления новой карточки + статус активности кнопки в зависимости от значения валидации.

🪛 **UPD 24.03.2023. ПР12: регистрация и авторизация:**
* Добавлен функционал по регистрации, авторизации и аутентификации пользователей
* Созданы роуты для перенаправления пользователя в зависмости от того авторизован он или нет
* В случае если пользователь авторизовался, его уникальный токен сохраняется в local storage и при следующем входе на сайт вводить регистрационную информацию не потребуется
* Если при входе на сайт пользователь не авторизован, он перенаправляется на страницу регистрации, где может либо создать новую учетную запить, либо авторизоваться с существующей
* Добавлены компоненты Login и Register для авторизации и регистрации соответственно, НОС ProtectedRoute для защиты роута "/", а также компонент для информирования пользователя о статусе регистрации



