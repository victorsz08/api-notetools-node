import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { UpdateAvatarUserUsecase } from "../../../../../usecases/user/update-avatar.usecase";
import { updateAvatarSchema } from "../../../../../validators/user.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";




export class UpdateAvatarUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateAvatarUserUsecase: UpdateAvatarUserUsecase
    ) {};

    public static build(updateAvatarUserUsecase: UpdateAvatarUserUsecase) {
        return new UpdateAvatarUserRoute("/users/update-avatar/:id", HttpMethod.PUT, updateAvatarUserUsecase);
    };
    
    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const { avatarUrl } = req.body;

            const input = updateAvatarSchema.parse({ avatarUrl });
            await this.updateAvatarUserUsecase.execute({ id, ...input });

            return res.status(204).send();
        }
    };
    
    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method;
    };

    public getMiddlewares(): ((req: Request, res: Response, next: NextFunction) => Promise<any>)[] {
        return [
            Logger(),
            ValidateSchema(updateAvatarSchema, "body")
        ]
    };
};