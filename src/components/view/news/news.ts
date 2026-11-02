import './news.css';
import { Article } from '../../../types';

const NEWS_LIMIT = 12;

class News {
    draw(data: ReadonlyArray<Article>): void {
        const news = data.slice(0, NEWS_LIMIT);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        if (!(newsItemTemp instanceof HTMLTemplateElement)) return;

        news.forEach((item) => {
            const newsClone = document.importNode(newsItemTemp.content, true);

            const photo = newsClone.querySelector('.news__meta-photo');
            if (photo instanceof HTMLElement) {
                if (item.urlToImage) {
                    photo.style.backgroundImage = `url("${item.urlToImage}")`;
                } else {
                    photo.remove();
                }
            }

            const date = item.publishedAt.slice(0, 10).split('-').reverse().join('.');

            const field: Record<string, string | null> = {
                '.news__meta-author': item.author,
                '.news__meta-date': date,
                '.news__description-title': item.title,
                '.news__description-source': item.source.name,
                '.news__description-content': item.description,
            };

            Object.entries(field).forEach(([selector, value]) => {
                const element = newsClone.querySelector(selector);
                if (element) element.textContent = value;
            });

            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news')?.replaceChildren(fragment);
    }
}

export default News;
