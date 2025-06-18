import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { CreateOrderUsecase } from "../../../../../usecases/order/create.usecase";
import { createOrderValidator } from "../../../../../validators/order.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class CreateOrderRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createOrderUsecase: CreateOrderUsecase
    ) {}

    public static build(createOrderUsecase: CreateOrderUsecase) {
        return new CreateOrderRoute(
            "/orders/:userId",
            HttpMethod.POST,
            createOrderUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const body = req.body;
            const { userId } = req.params;

            const input = createOrderValidator.parse({ ...body, userId });

            await this.createOrderUsecase.execute(input);
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
        return [Logger(), ValidateSchema(createOrderValidator)];
    }
}
