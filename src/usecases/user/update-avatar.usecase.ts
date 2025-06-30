import { UserInterface } from "../../domain/interfaces/user.interface";
import { Usecase } from "../usecase";



export type UpdateAvatarUserInputDto = {
    id: string;
    avatarUrl: string;
};



export type UpdateAvatarUserOutputDto = void;



export class UpdateAvatarUserUsecase implements Usecase<UpdateAvatarUserInputDto, UpdateAvatarUserOutputDto> {
    private constructor(private readonly userInterface: UserInterface) {};

    public static build(userInterface: UserInterface): UpdateAvatarUserUsecase {
        return new UpdateAvatarUserUsecase(userInterface);
    };
    public async execute(input: UpdateAvatarUserInputDto): Promise<void> {
        const { id, avatarUrl } = input;

        await this.userInterface.updateAvatar(id, avatarUrl);
        return;
    };
};