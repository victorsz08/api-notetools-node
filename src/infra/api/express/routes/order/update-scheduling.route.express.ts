import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateSchedulingUsecase } from "../../../../../usecases/order/update-scheduling.usecase";
import { updateSchedulingSchema } from "../../../../../validators/order.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class UpdateSchedulingRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateSchedulingUsecase: UpdateSchedulingUsecase
    ) {}

    public static build(updateSchedulingUsecase: UpdateSchedulingUsecase) {
        return new UpdateSchedulingRoute(
            "/orders/update-scheduling/:id",
            HttpMethod.PUT,
            updateSchedulingUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const body = req.body;

            const input = updateSchedulingSchema.parse({ id, ...body });
            await this.updateSchedulingUsecase.execute(input);

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
        return [Logger(), ValidateSchema(updateSchedulingSchema)];
    }
}
