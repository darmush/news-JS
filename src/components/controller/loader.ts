import { Callback, Endpoint, ErrorStatus, HttpMethod, QueryOptions } from '../../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<Pick<QueryOptions, 'apiKey'>>;

    constructor(baseLink: string, options: Pick<QueryOptions, 'apiKey'>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: { endpoint: Endpoint; options?: Partial<QueryOptions> },
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorStatus.Unauthorized || res.status === ErrorStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<QueryOptions>, endpoint: Endpoint): string {
        const urlOptions: Partial<QueryOptions> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]) => {
            url += `${key}=${value}&`;
        });

        // Убирает лишний & после последнего параметра
        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: Callback<T>,
        options: Partial<QueryOptions> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
