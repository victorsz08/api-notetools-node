import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { CreateUserUsecase } from "../../../../../usecases/user/create.usecase";
import { createUserSchema } from "../../../../../validators/user.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";
import { Guard } from "../../../../../middleware/guard";
import { Role } from "../../../../../domain/enum/role.enum";

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserUsecase: CreateUserUsecase
    ) {}

    public static build(createUserUsecase: CreateUserUsecase) {
        return new CreateUserRoute(
            "/users",
            HttpMethod.POST,
            createUserUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const body = req.body;
            const input = createUserSchema.parse(body);

            await this.createUserUsecase.execute(input);

            return res.status(201).send();
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
        return [
            Logger(),
            ValidateSchema(createUserSchema, "body"),
            Guard(Role.ADMIN),
        ];
    }
}
