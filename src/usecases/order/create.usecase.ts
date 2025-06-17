import { OrderEntity } from "../../domain/entities/order.entity";
import { OrderInterface } from "../../domain/interfaces/order.interface";
import { Usecase } from "../usecase";

export type CreateOrderInputDto = {
    number: number;
    local: string;
    schedulingDate: Date;
    schedulingTime: string;
    price: number;
    contact: string;
    userId: string;
};

export type CreateOrderOutputDto = void;

export class CreateOrderUsecase
    implements Usecase<CreateOrderInputDto, CreateOrderOutputDto>
{
    private constructor(private readonly orderInterface: OrderInterface) {}

    public static build(orderInterface: OrderInterface) {
        return new CreateOrderUsecase(orderInterface);
    }

    public async execute(input: CreateOrderInputDto): Promise<void> {
        const {
            number,
            local,
            schedulingDate,
            schedulingTime,
            price,
            contact,
            userId,
        } = input;

        const order = OrderEntity.build(
            number,
            local,
            schedulingDate,
            schedulingTime,
            price,
            contact,
            userId,
        );

        await this.orderInterface.create(order);
        return;
    }
}
