export {};

declare global {
    interface Window {
        env: {
            APIURL: string;
        };
    }
}
