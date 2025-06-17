import { OrderInterface } from "../../domain/interfaces/order.interface";
import OrderMapper, { type OrderDto } from "../../package/mapper/order-mapper";
import { Usecase } from "../usecase";

export type FindOrderInputDto = {
    id: string;
};

export type FindOrderOutputDto = OrderDto;

export class FindOrderUsecase
    implements Usecase<FindOrderInputDto, FindOrderOutputDto>
{
    private constructor(private readonly orderInterface: OrderInterface) {}

    public static build(orderInterface: OrderInterface) {
        return new FindOrderUsecase(orderInterface);
    }

    public async execute(input: FindOrderInputDto): Promise<OrderDto> {
        const { id } = input;
        const order = await this.orderInterface.find(id);

        const output = OrderMapper.toDto(order);
        return output;
    }
}
