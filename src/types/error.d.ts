declare global {
    interface Error {
        code?: string;
        status?: number;
    }
}
export {};
