import Constants from 'expo-constants';
import type { ApiRequestOptions } from './generated/core/ApiRequestOptions';
import type { CancelablePromise } from './generated/core/CancelablePromise';
import { FetchHttpRequest } from './generated/core/FetchHttpRequest';
import type { OpenAPIConfig } from './generated/core/OpenAPI';

export class CustomHttpRequest extends FetchHttpRequest {
    constructor(config: OpenAPIConfig) {
        super(config);
    }

    override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
        const headers = {
            ...options.headers, // Copy existing headers
            'x-apisports-key': Constants.expoConfig?.extra?.FOOTBALL_API_KEY || '', // Use the API key from expo-constants
        };

        return super.request<T>({
            ...options, // Spread other options
            headers, // Use the new headers object
        });
    }
}
