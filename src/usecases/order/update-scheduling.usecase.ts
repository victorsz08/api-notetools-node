import { OrderInterface } from "../../domain/interfaces/order.interface";
import dateGenerate from "../../package/patterns/date-generate";
import { Usecase } from "../usecase";

export type UpdateSchedulingInputDto = {
    id: string;
    schedulingDate: Date;
    schedulingTime: string;
};

export type UpdateSchedulingOutputDto = void;

export class UpdateSchedulingUsecase
    implements Usecase<UpdateSchedulingInputDto, UpdateSchedulingOutputDto>
{
    private constructor(private readonly orderInterface: OrderInterface) {}

    public static build(orderInterface: OrderInterface) {
        return new UpdateSchedulingUsecase(orderInterface);
    }

    public async execute(input: UpdateSchedulingInputDto): Promise<void> {
        const { id, schedulingDate, schedulingTime } = input;
        const updatedAt = dateGenerate.now();

        await this.orderInterface.updateScheduling(
            id,
            schedulingDate,
            schedulingTime,
            updatedAt,
        );
        return;
    }
}
