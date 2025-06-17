import { NextFunction, Request, Response } from "express";
import { HttpException } from "../package/http-exceptions/http-exception";
type T = any;

export function HttpHandlerError(
    error: Error & Partial<HttpException>,
    req: Request,
    res: Response,
    next: NextFunction
): T {
    const statusCode = error.statusCode ?? 500;
    const message = error.message ?? "Error interno do servidor";

    return res.status(statusCode).json({ error: message });
};