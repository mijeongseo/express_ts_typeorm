declare global {
    interface Error {
        code?: string;
        status?: number;
        errors?: Array;
    }
}
export {};
