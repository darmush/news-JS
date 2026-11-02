import AppLoader from './appLoader';
import { Callback, Endpoint, NewsResponse, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(sourceIds: ReadonlyArray<string>, callback: Callback<NewsResponse>): void {
        if (sourceIds.length === 0) return;

        super.getResp<NewsResponse>(
            {
                endpoint: Endpoint.Everything,
                options: {
                    sources: sourceIds.join(','),
                },
            },
            callback
        );
    }
}

export default AppController;
