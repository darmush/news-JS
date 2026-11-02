import './news.css';
import { Article } from '../../../types';

class News {
    draw(data: ReadonlyArray<Article>): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        if (!(newsItemTemp instanceof HTMLTemplateElement)) return;

        news.forEach((item, idx) => {
            const newsClone = document.importNode(newsItemTemp.content, true);

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const photo = newsClone.querySelector('.news__meta-photo');
            if (photo instanceof HTMLElement) {
                photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const date = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const field: Record<string, string | null> = {
                '.news__meta-author': item.author || item.source.name,
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
