import { NoteEntity } from "../../domain/entities/note.entity";
import dateGenerate from "../patterns/date-generate";

export type NoteDto = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

class NoteMapper {
    public toDto(note: NoteEntity): NoteDto {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            createdAt: dateGenerate.format(note.createdAt),
            updatedAt: dateGenerate.format(note.updatedAt),
        };
    }
}

export default new NoteMapper();
