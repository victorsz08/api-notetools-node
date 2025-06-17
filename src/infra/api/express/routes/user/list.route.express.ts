import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { ListUserUsecase } from "../../../../../usecases/user/list.usecase";
import { listUserSchema } from "../../../../../validators/user.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class ListUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listUserUsecase: ListUserUsecase
    ) {}

    public static build(listUserUsecase: ListUserUsecase) {
        return new ListUserRoute("/users", HttpMethod.GET, listUserUsecase);
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const query = req.query;
            const input = listUserSchema.parse(query);

            const output = await this.listUserUsecase.execute(input);
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
        return [Logger(), ValidateSchema(listUserSchema)];
    }
}
