// Источник новостей — ответ /sources
export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface SourcesResponse {
    status: string;
    sources: Source[];
}

// Статья — ответ /everything
export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpMethod {
    Get = 'GET',
}

export enum ErrorStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export interface QueryOptions {
    apiKey: string;
    sources: string;
}

export type Callback<T> = (data: T) => void;
