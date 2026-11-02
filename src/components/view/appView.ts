import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse, SourcesResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    private readonly categories = new Map<string, string>();

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Readonly<NewsResponse>): void {
        this.news.draw(data.articles ?? [], this.categories);
    }

    public drawSources(data: Readonly<SourcesResponse>): void {
        const sources = data.sources ?? [];
        sources.forEach((source) => this.categories.set(source.id, source.category));
        this.sources.draw(sources);
    }
}

export default AppView;
