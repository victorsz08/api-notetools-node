import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { sign, verify } from "jsonwebtoken";
import { config } from "../../../../../../prisma/config/config";
import { Logger } from "../../../../../middleware/logger";




export class RefreshTokenRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
    ) {};

    public static build() {
        return new RefreshTokenRoute(
            "/auth/refresh",
            HttpMethod.POST,
        );
    }
    
    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            try {
                const token = req.cookies["nt.authtoken"];
                const payload = verify(token, config.secret) as {
                    id: string;
                    role: string;
                };

                const refreshToken = sign(
                    {
                        id: payload.id,
                        role: payload.role,
                    },
                    config.secret,
                    {
                        expiresIn: "1d",
                    }
                );

                res.cookie("nt.authtoken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                    maxAge: 1000 * 60 * 60 * 24,
                });

                return res.status(200).send();
            } catch (err) {
                return res
                    .status(401)
                    .send({ message: "Token inválido ou expirado" });
            }
        };
    }
    public getPath(): string {
        return this.path;
    };
    public getMethod(): HttpMethod {
        return this.method;
    };
    public getMiddlewares(): ((req: Request, res: Response, next: NextFunction) => Promise<any>)[] {
        return [
        ]
    };
};