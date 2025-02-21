/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENEMR_URL: string
  readonly VITE_OPENEMR_CLIENT_ID: string
  readonly VITE_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
