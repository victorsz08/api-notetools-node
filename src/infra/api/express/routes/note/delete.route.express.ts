import { NextFunction, Request, Response } from "express";
import { DeleteNoteUsecase } from "../../../../../usecases/note/delete.usecase";
import { HttpMethod, Route } from "../route.express";
import { findNoeSchema } from "../../../../../validators/note.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class DeleteNoteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteNoteUsecase: DeleteNoteUsecase
    ) {}

    public static build(deleteNoteUsecase: DeleteNoteUsecase) {
        return new DeleteNoteRoute(
            "/notes/:id",
            HttpMethod.DELETE,
            deleteNoteUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const input = findNoeSchema.parse({ id });

            await this.deleteNoteUsecase.execute(input);
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
        return [Logger(), ValidateSchema(findNoeSchema, "params")];
    }
}
