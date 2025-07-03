import { Request, Response, NextFunction } from "express";
import { config } from "../../prisma/config/config";
import { verify } from "jsonwebtoken";
export function Logger() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies["nt.authtoken"];

        if (!token) {
            return res.status(401).json({ error: "Token não localizado" });
        }

        try {
            const decode = verify(token, config.secret);
            console.log(decode);
            next();
        } catch (error) {
            return res.status(401).json({ error: "usuário não autorizado" });
        }
    };
}
