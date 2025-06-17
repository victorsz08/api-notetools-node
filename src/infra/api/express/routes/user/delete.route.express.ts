import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { DeleteUserUsecase } from "../../../../../usecases/user/delete.usecase";
import { findUserSchema } from "../../../../../validators/user.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class DeleteUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteUserUsecase: DeleteUserUsecase
    ) {}

    public static build(deleteUserUsecase: DeleteUserUsecase) {
        return new DeleteUserRoute(
            "/users/:id",
            HttpMethod.DELETE,
            deleteUserUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const params = req.params;
            const input = findUserSchema.parse(params);

            await this.deleteUserUsecase.execute(input);

            return res.status(204).send();
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
        return [Logger(), ValidateSchema(findUserSchema)];
    }
}
