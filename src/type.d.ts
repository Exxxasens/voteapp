declare global {
    interface IQuestion {
        title: string;
        options: string[];
        correct: string;
    }
    interface User {
        username: string;
    }
}

export {};
