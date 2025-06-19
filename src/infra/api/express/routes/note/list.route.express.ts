import { NextFunction, Request, Response } from "express";
import { ListNoteUsecase } from "../../../../../usecases/note/list.usecase";
import { HttpMethod, Route } from "../route.express";
import { listNoteSchema } from "../../../../../validators/note.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class ListNoteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listNoteUsecase: ListNoteUsecase
    ) {}

    public static build(listNoteUsecase: ListNoteUsecase) {
        return new ListNoteRoute(
            "/notes/list/:userId",
            HttpMethod.GET,
            listNoteUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { userId } = req.params;
            const query = req.query;

            const input = listNoteSchema.parse(query);
            const data = await this.listNoteUsecase.execute({
                ...input,
                userId,
            });

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
        next: NextFunction
    ) => Promise<any>)[] {
        return [Logger(), ValidateSchema(listNoteSchema, "query")];
    }
}
