import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdatePasswordUsecase } from "../../../../../usecases/user/update-password.usecase";
import { updatePasswordSchema } from "../../../../../validators/user.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class UpdatePasswordRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updatePasswordUsecase: UpdatePasswordUsecase
    ) {}

    public static build(updatePasswordUsecase: UpdatePasswordUsecase) {
        return new UpdatePasswordRoute(
            "/users/update-password/:id",
            HttpMethod.PUT,
            updatePasswordUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const body = req.body;

            const input = updatePasswordSchema.parse(body);
            await this.updatePasswordUsecase.execute({ ...input, id });

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
        return [Logger(), ValidateSchema(updatePasswordSchema, "body")];
    }
}
