import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateUserUsecase } from "../../../../../usecases/user/update.usecase";
import { updateUserSchema } from "../../../../../validators/user.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class UpdateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateUserUsecase: UpdateUserUsecase
    ) {}

    public static build(updateUserUsecase: UpdateUserUsecase) {
        return new UpdateUserRoute(
            "/users/:id",
            HttpMethod.PUT,
            updateUserUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const body = req.body;

            const input = updateUserSchema.parse({ id, ...body });
            await this.updateUserUsecase.execute(input);

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
        return [Logger(), ValidateSchema(updateUserSchema)];
    }
}
