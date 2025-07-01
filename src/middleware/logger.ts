import { Request, Response, NextFunction } from "express";
import { config } from "../../prisma/config/config";
import { verify } from "jsonwebtoken";

export function Logger() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Token não localizado" });
        }

        const accessToken = token.split(" ")[1];
        console.log("token: ", token);

        try {
            verify(accessToken, config.secret);

            next();
        } catch (error) {
            return res.status(401).json({ error: "usuário não autorizado" });
        }
    };
}
