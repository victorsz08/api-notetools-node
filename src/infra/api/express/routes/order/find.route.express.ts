import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { FindOrderUsecase } from "../../../../../usecases/order/find.usecase";
import { findOrderSchema } from "../../../../../validators/order.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class FindOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findOrderUsecase: FindOrderUsecase
    ) {}

    public static build(findOrderUsecase: FindOrderUsecase) {
        return new FindOrderRoute(
            "/orders/:id",
            HttpMethod.GET,
            findOrderUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;

            const input = findOrderSchema.parse({ id });
            const order = await this.findOrderUsecase.execute(input);

            return res.status(200).json(order);
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
