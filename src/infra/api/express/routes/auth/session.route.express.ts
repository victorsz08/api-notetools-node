import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { verify } from "jsonwebtoken";
import { config } from "../../../../../../prisma/config/config";
import { Logger } from "../../../../../middleware/logger";

export class AuthSessionRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod
    ) {}

    public static build() {
        return new AuthSessionRoute("/auth/session", HttpMethod.GET);
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ error: "Token não localizado" });
            }
            const accessToken = token.split(" ")[1];
            const session = verify(accessToken, config.secret);

            return res.status(200).json(session);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getMiddlewares(): ((
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<any>)[] {
        return [Logger()];
    }
}
