import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { FindUserUsecase } from "../../../../../usecases/user/find.usecase";
import { findUserSchema } from "../../../../../validators/user.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class FindUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findUserUsecase: FindUserUsecase
    ) {}

    public static build(findUserUsecase: FindUserUsecase) {
        return new FindUserRoute("/users/:id", HttpMethod.GET, findUserUsecase);
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const params = req.params;
            const input = findUserSchema.parse(params);

            const output = await this.findUserUsecase.execute(input);
            return res.status(200).json(output);
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
        return [Logger(), ValidateSchema(findUserSchema, "params")];
    }
}
