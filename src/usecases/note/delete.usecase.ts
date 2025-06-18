import { NoteInterface } from "../../domain/interfaces/note.interface";
import { Usecase } from "../usecase";

export type DeleteNoteInputDto = {
    id: string;
};

export type DeleteNoteOutputDto = void;

export class DeleteNoteUsecase
    implements Usecase<DeleteNoteInputDto, DeleteNoteOutputDto>
{
    private constructor(private readonly noteInterface: NoteInterface) {}

    public static build(noteInterface: NoteInterface) {
        return new DeleteNoteUsecase(noteInterface);
    }

    public async execute(input: DeleteNoteInputDto): Promise<void> {
        const { id } = input;

        await this.noteInterface.delete(id);
        return;
    }
}
