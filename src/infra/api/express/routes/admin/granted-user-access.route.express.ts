import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { GrantedUserAccessUsecase } from "../../../../../usecases/admin/granted-user-access.usecase";
import { grantedUserAccessSchema } from "../../../../../validators/admin.validator";
import { Logger } from "../../../../../middleware/logger";
import { Guard } from "../../../../../middleware/guard";
import { Role } from "../../../../../domain/enum/role.enum";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class GrantedUserAccessRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly grantedUserAccessUsecase: GrantedUserAccessUsecase
    ) {}

    public static build(grantedUserAccessUsecase: GrantedUserAccessUsecase) {
        return new GrantedUserAccessRoute(
            "/admin/granted-user-access/:id",
            HttpMethod.POST,
            grantedUserAccessUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const body = req.body;

            const input = grantedUserAccessSchema.parse(body);
            await this.grantedUserAccessUsecase.execute({ id, ...input });

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
        return [
            Logger(),
            Guard(Role.ADMIN),
            ValidateSchema(grantedUserAccessSchema, "body"),
        ];
    }
}
