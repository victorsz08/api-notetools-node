type T = any;
import { Request, Response, NextFunction } from "express";

export type HttpMethod = "get" | "post" | "put" | "delete";
export const HttpMethod = {
    POST: "post" as HttpMethod,
    GET: "get" as HttpMethod,
    PUT: "put" as HttpMethod,
    DELETE: "delete" as HttpMethod,
} as const;

export interface Route {
    getHandler(): (req: Request, res: Response) => Promise<T>;
    getPath(): string;
    getMethod(): HttpMethod;
    getMiddlewares(): ((
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<T>)[];
}
