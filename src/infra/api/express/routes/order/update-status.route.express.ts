import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateStatusUsecase } from "../../../../../usecases/order/update-status.usecase";
import { updateStatusSchema } from "../../../../../validators/order.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class UpdateStatusRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateStatusUsecase: UpdateStatusUsecase
    ) {}

    public static build(updateStatusUsecase: UpdateStatusUsecase) {
        return new UpdateStatusRoute(
            "/order/update-status/:id",
            HttpMethod.POST,
            updateStatusUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const body = req.body;

            const input = updateStatusSchema.parse(body);
            await this.updateStatusUsecase.execute({ ...input, id });

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
        return [Logger(), ValidateSchema(updateStatusSchema, "body")];
    }
}
