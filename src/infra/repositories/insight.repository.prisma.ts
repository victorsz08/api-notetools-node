import { PrismaClient } from "@prisma/client";
import {
    GetInsightDto,
    GetInsightPerDayDto,
    GetStatusInsightDto,
    InsightInterface,
} from "../../domain/interfaces/insight.interface";
import { Status } from "../../domain/enum/status.enum";
import moment from "moment-timezone";

export class InsightRepository implements InsightInterface {
    private constructor(private readonly repository: PrismaClient) {}

    public static build(repository: PrismaClient) {
        return new InsightRepository(repository);
    }

    public async getInsight(
        userId: string,
        dateIn: Date,
        dateOut: Date,
    ): Promise<GetInsightDto> {
        const [sales, connected, cancelled] =
            await this.repository.$transaction([
                this.repository.contract.count({
                    where: {
                        user: { id: userId },
                        createdAt: {
                            gte: dateIn,
                            lte: dateOut,
                        },
                    },
                }),

                this.repository.contract.findMany({
                    where: {
                        user: { id: userId },
                        createdAt: {
                            gte: dateIn,
                            lte: dateOut,
                        },
                        status: Status.CONECTED,
                    },
                }),

                this.repository.contract.count({
                    where: {
                        user: { id: userId },
                        createdAt: {
                            gte: dateIn,
                            lte: dateOut,
                        },
                        status: Status.CANCELLED,
                    },
                }),
            ]);

        const revenue = connected
            .reduce((acc, item) => acc + item.price, 0)
            .toFixed(2);
        const completionRate = (
            connected.length /
            (connected.length + cancelled)
        ).toFixed(2);

        return {
            revenue: Number(revenue),
            sales: sales,
            completionRate: Number(completionRate),
        };
    }

    public async getStatusInsight(
        userId: string,
        dateIn: Date,
        dateOut: Date,
    ): Promise<GetStatusInsightDto> {
        const [connected, cancelled, pending] =
            await this.repository.$transaction([
                this.repository.contract.count({
                    where: {
                        user: { id: userId },
                        createdAt: {
                            gte: dateIn,
                            lte: dateOut,
                        },
                        status: Status.CONECTED,
                    },
                }),
                this.repository.contract.count({
                    where: {
                        user: { id: userId },
                        createdAt: {
                            gte: dateIn,
                            lte: dateOut,
                        },
                        status: Status.CANCELLED,
                    },
                }),
                this.repository.contract.count({
                    where: {
                        user: { id: userId },
                        createdAt: {
                            gte: dateIn,
                            lte: dateOut,
                        },
                        status: Status.PENDING,
                    },
                }),
            ]);

        return {
            connected,
            cancelled,
            pending,
        };
    }

    public async getInsightPerDay(
        userId: string,
        dateIn: Date,
        dateOut: Date,
    ): Promise<GetInsightPerDayDto> {
        const dailySales = await this.repository.contract.groupBy({
            by: ["createdAt"],
            _count: {
                _all: true,
            },
            where: {
                user: { id: userId },
                createdAt: {
                    gte: dateIn,
                    lte: dateOut,
                },
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        const sales = dailySales.map((item) => ({
            day: moment(item.createdAt).startOf("day").toDate(),
            quantity: item._count._all,
        }));

        return {
            sales,
        };
    }
}
