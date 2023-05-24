import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, IArticle, IArticleView } from "entities/Article";
import cls from './ArticlesPage.module.scss';

interface IArticlesPageProps {
   className?: string
}

const mock = {
    id: "1",
    title: "Javascript news Javascript news Javascript news Javascript news",
    subtitle: "Что нового в JS за 2023 год?",
    img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
    views: 1022,
    createAt: "10.05.2023",
    type: [
        "IT",
        "SCIENCE",
        "POLITICS",
        "ECONOMICS",
    ],
    user: {
        id: '1',
        username: 'article master',
        // eslint-disable-next-line max-len
        avatar: 'data:image/jpeg;base64,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',
    },
    blocks: [
        {
            id: "1",
            type: "TEXT",
            title: "Заголовок этого блока",
            paragraphs: [
                "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
                // eslint-disable-next-line max-len
                "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
                // eslint-disable-next-line max-len
                "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:",
            ],
        },
        {
            id: "4",
            type: "CODE",
            code: "<!DOCTYPE html>\n<html>\n  <body>\n    <p id=\"hello\"></p>\n\n    <script>\n      document.getElementById(\"hello\").innerHTML = \"Hello, world!\";\n    </script>\n  </body>\n</html>;",
        },
        {
            id: "5",
            type: "TEXT",
            title: "Заголовок этого блока",
            paragraphs: [
                "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.",
                // eslint-disable-next-line max-len
                "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:",
            ],
        },
        {
            id: "2",
            type: "IMAGE",
            src: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
            title: "Рисунок 1 - скриншот сайта",
        },
        {
            id: "3",
            type: "CODE",
            code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
        },
        {
            id: "7",
            type: "TEXT",
            title: "Заголовок этого блока",
            paragraphs: [
            // eslint-disable-next-line max-len
                "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
                // eslint-disable-next-line max-len
                "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:",
            ],
        },
        {
            id: "8",
            type: "IMAGE",
            src: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
            title: "Рисунок 1 - скриншот сайта",
        },
        {
            id: "9",
            type: "TEXT",
            title: "Заголовок этого блока",
            paragraphs: [
            // eslint-disable-next-line max-len
                "JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
            ],
        },
    ],
} as IArticle;

const ArticlesPage: FC<IArticlesPageProps> = (props) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames('', {}, [className])}>
            <ArticleList
                view={IArticleView.LIST}
                isLoading
                articles={new Array(16).fill(0).map((item, index) => (
                    {
                        ...mock,
                        id: String(index),
                    }))}
            />
        </div>
    );
};

export default memo(ArticlesPage);
