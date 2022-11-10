declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE_URL: string;
            TOKEN_SECRET: string;
        }
    }
    namespace Express {
        export interface Request {
            user: {
                username: string;
            };
        }
    }
}

export {};
