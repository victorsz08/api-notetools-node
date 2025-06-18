import moment from "moment-timezone";
import {
    GetInsightPerDayDto,
    InsightInterface,
} from "../../domain/interfaces/insight.interface";
import dateGenerate from "../../package/patterns/date-generate";
import { Usecase } from "../usecase";

export type GetInsightPerDayInputDto = {
    userId: string;
    dateIn: Date;
    dateOut: Date;
};

export type GetInsightPerDayOutputDto = {
    sales: {
        day: string;
        quantity: number;
    }[];
};

export class GetInsightPerDayUsecase
    implements Usecase<GetInsightPerDayInputDto, GetInsightPerDayOutputDto>
{
    private constructor(private readonly insightInterface: InsightInterface) {}

    public static build(insightInterface: InsightInterface) {
        return new GetInsightPerDayUsecase(insightInterface);
    }

    public async execute(
        input: GetInsightPerDayInputDto,
    ): Promise<GetInsightPerDayOutputDto> {
        const { userId, dateIn, dateOut } = input;

        const data = await this.insightInterface.getInsightPerDay(
            userId,
            dateIn,
            dateOut,
        );

        const output = this.present(data);
        return output;
    }

    private present(data: GetInsightPerDayDto): GetInsightPerDayOutputDto {
        return {
            sales: data.sales.map((sale) => {
                return {
                    day: moment(sale.day).format("DD/MM"),
                    quantity: sale.quantity,
                };
            }),
        };
    }
}
