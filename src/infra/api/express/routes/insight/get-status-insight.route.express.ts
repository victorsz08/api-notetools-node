import { NextFunction, Request, Response } from "express";
import { GetStatusInsightUsecase } from "../../../../../usecases/insight/get-status-insight.usecase";
import { HttpMethod, Route } from "../route.express";
import { getInsightSchema } from "../../../../../validators/insight.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class GetStatusInsightRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getStatusInsightUsecase: GetStatusInsightUsecase,
    ) {}

    public static build(getStatusInsightUsecase: GetStatusInsightUsecase) {
        return new GetStatusInsightRoute(
            "/insights/status/:userId",
            HttpMethod.GET,
            getStatusInsightUsecase,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { userId } = req.params;
            const body = req.body;

            const input = getInsightSchema.parse({ userId, ...body });
            const data = await this.getStatusInsightUsecase.execute(input);

            return res.status(200).json(data);
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
        next: NextFunction,
    ) => Promise<any>)[] {
        return [Logger(), ValidateSchema(getInsightSchema)];
    }
}
