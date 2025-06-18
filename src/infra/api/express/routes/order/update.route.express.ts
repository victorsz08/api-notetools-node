import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateOrderUsecase } from "../../../../../usecases/order/update.usecase";
import { updateOrderSchema } from "../../../../../validators/order.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class UpdateOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateOrderUsecase: UpdateOrderUsecase
    ) {}

    public static build(updateOrderUsecase: UpdateOrderUsecase) {
        return new UpdateOrderRoute(
            "/order/:id",
            HttpMethod.PUT,
            updateOrderUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const body = req.body;

            const input = updateOrderSchema.parse({ id, ...body });
            await this.updateOrderUsecase.execute(input);

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
        return [Logger(), ValidateSchema(updateOrderSchema)];
    }
}
