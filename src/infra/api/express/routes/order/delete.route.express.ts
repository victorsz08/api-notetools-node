import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { DeleteOrderUsecase } from "../../../../../usecases/order/delete.usecase";
import { findOrderSchema } from "../../../../../validators/order.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class DeleteOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteOrderUsecase: DeleteOrderUsecase
    ) {}

    public static build(deleteOrderUsecase: DeleteOrderUsecase) {
        return new DeleteOrderRoute(
            "/orders/:id",
            HttpMethod.DELETE,
            deleteOrderUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;

            const input = findOrderSchema.parse({ id });
            await this.deleteOrderUsecase.execute(input);

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
        return [Logger(), ValidateSchema(findOrderSchema, "params")];
    }
}
