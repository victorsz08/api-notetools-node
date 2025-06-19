import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { ListOrderUsecase } from "../../../../../usecases/order/list.usecase";
import { listOrderSchema } from "../../../../../validators/order.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class ListOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listOrderUsecase: ListOrderUsecase
    ) {}

    public static build(listOrderUsecase: ListOrderUsecase) {
        return new ListOrderRoute(
            "/orders/list/:userId",
            HttpMethod.GET,
            listOrderUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { userId } = req.params;
            const query = req.query;

            const input = listOrderSchema.parse(query);
            const orders = await this.listOrderUsecase.execute({
                ...input,
                userId,
            });

            return res.status(200).json(orders);
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
        return [Logger(), ValidateSchema(listOrderSchema, "query")];
    }
}
