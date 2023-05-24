import { StateScheme } from "app/providers/StoreProvider";
import { IArticle } from "entities/Article";
import { ArticleBlockEnum, ArticleEnum } from "entities/Article/model/types/article";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from "entities/Article/model/selectors/articleDetails";

const data: IArticle = {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createAt: '26.02.2022',
    type: [ArticleEnum.IT],
    user: {
        id: '1',
        username: 'article master',
    },
    blocks: [
        {
            id: '1',
            type: ArticleBlockEnum.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                // eslint-disable-next-line max-len
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
            ],
        },
        {
            id: '4',
            type: ArticleBlockEnum.CODE,
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
        },
        {
            id: '5',
            type: ArticleBlockEnum.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
            ],
        },
    ],
};


describe('articleDetails', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            articleDetails: {
                data,
            },
        };
        expect(getArticleDetailsData(state as StateScheme)).toEqual(state.articleDetails?.data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateScheme> = {};
        expect(getArticleDetailsData(state as StateScheme)).toEqual(undefined);
    });
});


describe('getProfileError', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            articleDetails: {
                error: '123',
            },
        };
        expect(getArticleDetailsError(state as StateScheme)).toEqual('123');
    });
});

describe('getProfileLoading', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsIsLoading(state as StateScheme)).toBe(true);
    });
});
