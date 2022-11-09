declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE_URL: string;
            TOKEN_SECRET: string;
        }
    }
}

export {};
