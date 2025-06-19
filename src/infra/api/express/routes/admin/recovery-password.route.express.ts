import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { RecoveryPasswordUsecase } from "../../../../../usecases/admin/recovery-password.usecase";
import { recoveryPasswordSchema } from "../../../../../validators/admin.validator";
import { Logger } from "../../../../../middleware/logger";
import { Guard } from "../../../../../middleware/guard";
import { Role } from "../../../../../domain/enum/role.enum";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class RecoveryPasswordRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly recoveryPasswordUsecase: RecoveryPasswordUsecase
    ) {}

    public static build(recoveryPasswordUsecase: RecoveryPasswordUsecase) {
        return new RecoveryPasswordRoute(
            "/admin/recovery-password/:id",
            HttpMethod.POST,
            recoveryPasswordUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;

            const input = recoveryPasswordSchema.parse({ id });
            const output = await this.recoveryPasswordUsecase.execute(input);

            res.status(200).json(output);
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
            ValidateSchema(recoveryPasswordSchema, "params"),
        ];
    }
}
