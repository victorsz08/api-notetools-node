import { NextFunction, Request, Response } from "express";
import { UpdateNoteUsecase } from "../../../../../usecases/note/update.usecase";
import { HttpMethod, Route } from "../route.express";
import { updateNoteSchema } from "../../../../../validators/note.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class UpdateNoteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateNoteUsecase: UpdateNoteUsecase
    ) {}

    public static build(updateNoteUsecase: UpdateNoteUsecase) {
        return new UpdateNoteRoute(
            "/notes/:id",
            HttpMethod.PUT,
            updateNoteUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const body = req.body;

            const input = updateNoteSchema.parse(body);
            await this.updateNoteUsecase.execute({ ...input, id });

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
        return [Logger(), ValidateSchema(updateNoteSchema, "body")];
    }
}
