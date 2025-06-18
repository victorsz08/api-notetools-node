import { NoteEntity } from "../entities/note.entity";

export type ListNoteOutput = {
    notes: NoteEntity[];
    totalItems: number;
    totalPages: number;
    limit: number;
    page: number;
};

export interface NoteInterface {
    create(note: NoteEntity): Promise<void>;
    find(id: string): Promise<NoteEntity>;
    list(page: number, limit: number, userId: string): Promise<ListNoteOutput>;
    update(
        id: string,
        title: string,
        content: string,
        updatedAt: Date,
    ): Promise<void>;
    delete(id: string): Promise<void>;
}
