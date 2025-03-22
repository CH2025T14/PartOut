/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_URL: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_REBRICKABLE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}