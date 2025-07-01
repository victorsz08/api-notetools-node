import { NextFunction, Request, Response } from "express";
import { Role } from "../domain/enum/role.enum";
import { verify } from "jsonwebtoken";
import { config } from "../../prisma/config/config";

type Payload = {
    id: string;
    role: Role;
};

export function Guard(role: Role) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "usuário não autorizado" });
        }

        const accessToken = token.split(" ")[1];

        try {
            const user = verify(accessToken, config.secret) as Payload;
            const userRole = user.role;

            if (userRole !== role) {
                return res.status(401).json({
                    error: "usuário sem permissão para acessar essa rota",
                });
            }

            return next();
        } catch (error) {
            return res.status(401).json({ error: "usuário não autorizado" });
        }
    };
}
