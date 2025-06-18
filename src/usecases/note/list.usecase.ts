import { NoteInterface } from "../../domain/interfaces/note.interface";
import noteMapper, { NoteDto } from "../../package/mapper/note-mapper";
import { Usecase } from "../usecase";

export type ListNoteInputDto = {
    page: number;
    limit: number;
    userId: string;
};

export type ListNoteOutputDto = {
    notes: NoteDto[];
    totalItems: number;
    totalPages: number;
    page: number;
    limit: number;
};

export class ListNoteUsecase
    implements Usecase<ListNoteInputDto, ListNoteOutputDto>
{
    private constructor(private readonly noteInterface: NoteInterface) {}

    public static build(noteInterface: NoteInterface) {
        return new ListNoteUsecase(noteInterface);
    }

    public async execute(input: ListNoteInputDto): Promise<ListNoteOutputDto> {
        const { page, limit, userId } = input;
        const data = await this.noteInterface.list(page, limit, userId);

        const output: ListNoteOutputDto = {
            notes: data.notes.map((note) => {
                return noteMapper.toDto(note);
            }),
            page: data.page,
            limit: data.limit,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
        };

        return output;
    }
}
