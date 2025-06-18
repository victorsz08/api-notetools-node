import dateGenerate from "../../package/patterns/date-generate";
import generateId from "../../package/patterns/generate-id";

export type Note = {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export class NoteEntity {
    private constructor(private readonly props: Note) {}

    public static build(title: string, content: string, userId: string) {
        return new NoteEntity({
            id: generateId.uuid(),
            title,
            content,
            userId,
            createdAt: dateGenerate.now(),
            updatedAt: dateGenerate.now(),
        });
    }

    public static with(props: Note) {
        return new NoteEntity(props);
    }

    public get id() {
        return this.props.id;
    }

    public get title() {
        return this.props.title;
    }

    public get content() {
        return this.props.content;
    }

    public get userId() {
        return this.props.userId;
    }

    public get createdAt() {
        return this.props.createdAt;
    }

    public get updatedAt() {
        return this.props.updatedAt;
    }
}
