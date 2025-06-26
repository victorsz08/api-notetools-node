import { Prisma, PrismaClient } from "@prisma/client";
import {
    ListNoteOutput,
    NoteInterface,
} from "../../domain/interfaces/note.interface";
import { NoteEntity } from "../../domain/entities/note.entity";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { StatusCode } from "../../package/http-exceptions/http-status-code";

export class NoteRepository implements NoteInterface {
    private constructor(private readonly repository: PrismaClient) {}

    public static build(repository: PrismaClient) {
        return new NoteRepository(repository);
    }

    public async create(note: NoteEntity): Promise<void> {
        const { id, title, content, userId, createdAt, updatedAt } = note;

        const user = await this.repository.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new HttpException(
                "usuário não localizado",
                StatusCode.BAD_REQUEST,
            );
        }

        await this.repository.notes.create({
            data: {
                id,
                title,
                text: content,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                createdAt,
                updatedAt,
            },
        });

        return;
    }

    public async find(id: string): Promise<NoteEntity> {
        const note = await this.repository.notes.findUnique({ where: { id } });
        if (!note) {
            throw new HttpException(
                "nota não localizada",
                StatusCode.BAD_REQUEST,
            );
        }

        const output = NoteEntity.with({
            id: note.id,
            title: note.title || "sem titulo",
            content: note.text,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        });

        return output;
    }

    public async list(
        page: number,
        limit: number,
        userId: string,
    ): Promise<ListNoteOutput> {
        const queryArgs: Prisma.NotesFindManyArgs = {
            where: {
                user: { id: userId },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: limit,
            skip: (page - 1) * limit,
        };

        const countArgs: Prisma.NotesCountArgs = {
            where: {
                user: {
                    id: userId,
                },
            },
        };

        const [notes, count] = await this.repository.$transaction([
            this.repository.notes.findMany(queryArgs),
            this.repository.notes.count(countArgs),
        ]);

        const totalPages = Math.ceil(count / limit);
        const notesList = notes.map((note) => {
            return NoteEntity.with({
                id: note.id,
                title: note.title || "sem titulo",
                content: note.text,
                userId: note.userId,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt,
            });
        });

        return {
            notes: notesList,
            totalItems: count,
            totalPages,
            page,
            limit,
        };
    }

    public async update(
        id: string,
        title: string,
        content: string,
        updatedAt: Date,
    ): Promise<void> {
        await this.find(id);

        await this.repository.notes.update({
            where: { id },
            data: {
                title,
                text: content,
                updatedAt,
            },
        });

        return;
    }

    public async delete(id: string): Promise<void> {
        await this.find(id);

        await this.repository.notes.delete({
            where: { id },
        });

        return;
    }
}
