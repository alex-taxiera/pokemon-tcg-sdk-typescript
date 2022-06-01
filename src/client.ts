import fetch from 'node-fetch'
import { Parameter } from './interfaces/parameter';
import { Response } from './interfaces/response';

export class Client {
    private readonly POKEMONTCG_API_BASE_URL: string =
        'https://api.pokemontcg.io';
    private readonly POKEMONTCG_API_VERSION: string = '2';
    private readonly POKEMONTCG_API_URL: string = `${this.POKEMONTCG_API_BASE_URL}/v${this.POKEMONTCG_API_VERSION}`;
    private readonly POKEMONTCG_API_KEY?: string =
        process.env.POKEMONTCG_API_KEY;

    private static instance: Client;

    private constructor() {}

    public static getInstance(): Client {
        if (!Client.instance) {
            Client.instance = new Client();
        }

        return Client.instance;
    }

    async get<T>(resource: string, params?: Parameter): Promise<Response<T>> {
        let url = `${this.POKEMONTCG_API_URL}/${resource}`;
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.POKEMONTCG_API_KEY) {
            headers['X-Api-Key'] = this.POKEMONTCG_API_KEY;
        }

        if (params) {
            url += `?${this.stringify(params)}`;
        }

        return fetch(url, { headers })
            .then(async res => {
                if (res.status < 200 || res.status >= 300) {
                    console.log(await res.text())
                    console.log(headers)
                    throw new Error(`${res.status}: ${res.statusText}`);
                }

                return res
            })
            .then(res => res.json())
    }

    private stringify(params: Parameter): string {
        const queryString = Object.keys(params)
            .map(
                (key: string) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(
                        params[key]
                    )}`
            )
            .join('&');

        return queryString;
    }
}
