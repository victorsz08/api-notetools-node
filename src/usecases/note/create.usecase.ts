import { NoteEntity } from "../../domain/entities/note.entity";
import { NoteInterface } from "../../domain/interfaces/note.interface";
import { Usecase } from "../usecase";

export type CreateNoteInputDto = {
    title: string;
    content: string;
    userId: string;
};

export type CreateNoteOutputDto = {
    id: string;
};

export class CreateNoteUsecase
    implements Usecase<CreateNoteInputDto, CreateNoteOutputDto>
{
    private constructor(private readonly noteInterface: NoteInterface) {}

    public static build(noteInterface: NoteInterface) {
        return new CreateNoteUsecase(noteInterface);
    }

    public async execute(
        input: CreateNoteInputDto,
    ): Promise<CreateNoteOutputDto> {
        const { title, content, userId } = input;

        const note = NoteEntity.build(title, content, userId);

        await this.noteInterface.create(note);
        const output = {
            id: note.id,
        };

        return output;
    }
}
