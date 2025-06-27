import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { AuthLoginUsecase } from "../../../../../usecases/auth/login.usecase";
import { authLoginSchema } from "../../../../../validators/auth.validator";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class AuthLoginRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authLoginUsecase: AuthLoginUsecase
    ) {}

    public static build(authLoginUsecase: AuthLoginUsecase) {
        return new AuthLoginRoute(
            "/auth/login",
            HttpMethod.POST,
            authLoginUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const body = req.body;
            const input = authLoginSchema.parse(body);

            const output = await this.authLoginUsecase.execute(input);

            res.cookie("nt.authtoken", output.token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24, // 1 day
                path: "/",
                sameSite: "none"
            });
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
        return [ValidateSchema(authLoginSchema)];
    }
}
