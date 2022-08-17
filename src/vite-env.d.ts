/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_WEB_API_LOCAL_URL: string;
    readonly VITE_VERSION: string;
    readonly VITE_APP_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
