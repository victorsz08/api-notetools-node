import { NoteInterface } from "../../domain/interfaces/note.interface";
import noteMapper, { NoteDto } from "../../package/mapper/note-mapper";
import { Usecase } from "../usecase";

export type FindNoteInputDto = {
    id: string;
};

export type FindNoteOutputDto = NoteDto;

export class FindNoteUsecase
    implements Usecase<FindNoteInputDto, FindNoteOutputDto>
{
    private constructor(private readonly noteInterface: NoteInterface) {}

    public static build(noteInterface: NoteInterface) {
        return new FindNoteUsecase(noteInterface);
    }

    public async execute(input: FindNoteInputDto): Promise<NoteDto> {
        const { id } = input;
        const note = await this.noteInterface.find(id);

        const output = noteMapper.toDto(note);

        return output;
    }
}
