import { NoteInterface } from "../../domain/interfaces/note.interface";
import dateGenerate from "../../package/patterns/date-generate";
import { Usecase } from "../usecase";

export type UpdateNoteInputDto = {
    id: string;
    title: string;
    content: string;
};

export type UpdateNoteOutputDto = void;

export class UpdateNoteUsecase
    implements Usecase<UpdateNoteInputDto, UpdateNoteOutputDto>
{
    private constructor(private readonly noteInterface: NoteInterface) {}

    public static build(noteInterface: NoteInterface) {
        return new UpdateNoteUsecase(noteInterface);
    }

    public async execute(input: UpdateNoteInputDto): Promise<void> {
        const { id, title, content } = input;
        const updatedAt = dateGenerate.now();

        await this.noteInterface.update(id, title, content, updatedAt);
        return;
    }
}
