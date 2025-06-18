import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { Logger } from "../../../../../middleware/logger";

export class AuthLogoutRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod
    ) {}

    public static build() {
        return new AuthLogoutRoute("/auth/logout", HttpMethod.POST);
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            res.clearCookie("nt.authtoken");
            return res.status(200).send();
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
