import { Status } from "../enum/status.enum"
import generateId from "../../package/patterns/generate-id";
import dateGenerate from "../../package/patterns/date-generate";


export type Order = {
    id: string;
    number: number;
    local: string;
    schedulingDate: Date;
    schedulingTime: string;
    price: number;
    status: string;
    contact: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};


export class OrderEntity {
    private constructor(private readonly props: Order) {};

    public static build(
        number: number,
        local: string,
        schedulingDate: Date,
        schedulingTime: string,
        price: number,
        contact: string,
        userId: string
    ) {
        return new OrderEntity({
            id: generateId.uuid(),
            number,
            local,
            schedulingDate,
            schedulingTime,
            price,
            contact,
            status: Status.PENDING,
            userId,
            createdAt: dateGenerate.now(),
            updatedAt: dateGenerate.now() 
        })
    };

    public static with(props: Order) {
        return new OrderEntity(props);
    };

    public get id() {
        return this.props.id;
    };

    public get number() {
        return this.props.number;
    };

    public get local() {
        return this.props.local;
    };

    public get schedulingDate() {
        return this.props.schedulingDate;
    };

    public get schedulingTime() {
        return this.props.schedulingTime;
    };

    public get price() {
        return this.props.price;
    };

    public get contact() {
        return this.props.contact;
    };

    public get status() {
        return this.props.status;
    };

    public get userId() {
        return this.props.userId;
    };

    public get createdAt() {
        return this.props.createdAt;
    };

    public get updatedAt() {
        return this.props.updatedAt;
    };
    
};