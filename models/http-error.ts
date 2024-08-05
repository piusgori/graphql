class HttpError extends Error {
    content: any;
    code: number;
    constructor (message: string, content: any, code: number) {
        super(message);
        this.content = content;
        this.code = code;
    }
}

export default HttpError;