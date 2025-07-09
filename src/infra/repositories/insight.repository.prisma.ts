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
        dateOut: Date
    ): Promise<GetInsightDto> {
        const [sales, connected, cancelled] =
            await this.repository.$transaction([
                this.repository.contract.count({
                    where: {
                        user: { id: userId },
                        installationDate: {
                            gte: dateIn,
                            lte: dateOut,
                        },
                    },
                }),

                this.repository.contract.findMany({
                    where: {
                        user: { id: userId },
                        installationDate: {
                            gte: dateIn,
                            lte: dateOut,
                        },
                        status: Status.CONECTED,
                    },
                }),

                this.repository.contract.count({
                    where: {
                        user: { id: userId },
                        installationDate: {
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
        dateOut: Date
    ): Promise<GetStatusInsightDto> {
        const [connected, cancelled, pending] =
            await this.repository.$transaction([
                this.repository.contract.count({
                    where: {
                        user: { id: userId },
                        installationDate: {
                            gte: dateIn,
                            lte: dateOut,
                        },
                        status: Status.CONECTED,
                    },
                }),
                this.repository.contract.count({
                    where: {
                        user: { id: userId },
                        installationDate: {
                            gte: dateIn,
                            lte: dateOut,
                        },
                        status: Status.CANCELLED,
                    },
                }),
                this.repository.contract.count({
                    where: {
                        user: { id: userId },
                        installationDate: {
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
        dateOut: Date
    ): Promise<GetInsightPerDayDto> {
        const allSales = await this.repository.contract.findMany({
            where: {
                user: { id: userId },
                createdAt: {
                    gte: dateIn,
                    lte: dateOut,
                },
            },
            select: {
                createdAt: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        const salesMap = new Map<number, number>();

        allSales.forEach((sale) => {
            const dayTimestamp = moment(sale.createdAt)
                .startOf("day")
                .valueOf();
            salesMap.set(dayTimestamp, (salesMap.get(dayTimestamp) || 0) + 1);
        });

        const sales = Array.from(salesMap.entries())
            .map(([dayTimestamp, quantity]) => ({
                day: new Date(dayTimestamp),
                quantity: quantity,
            }))
            .sort((a, b) => a.day.getTime() - b.day.getTime()); // Sort by day

        return {
            sales,
        };
    }

    public async getTrendingInsight(userId: string): Promise<{
        sales: { previous: number; last: number; trend: number };
        revenue: { previous: number; last: number; trend: number };
        completionRate: { previous: number; last: number; trend: number };
    }> {
        const now = moment();
        const startOfLastMonth = now
            .clone()
            .subtract(1, "month")
            .startOf("month")
            .toDate();
        const endOfLastMonth = now
            .clone()
            .subtract(1, "month")
            .endOf("month")
            .toDate();
        const startOfPreviousMonth = now
            .clone()
            .subtract(2, "month")
            .startOf("month")
            .toDate();
        const endOfPreviousMonth = now
            .clone()
            .subtract(2, "month")
            .endOf("month")
            .toDate();

        const last = await this.getInsight(
            userId,
            startOfLastMonth,
            endOfLastMonth
        );
        const previous = await this.getInsight(
            userId,
            startOfPreviousMonth,
            endOfPreviousMonth
        );

        function calcTrend(prev: number, curr: number): number {
            if (prev === 0) return curr === 0 ? 0 : 100;
            return Number((((curr - prev) / prev) * 100).toFixed(2));
        }

        return {
            sales: {
                previous: previous.sales,
                last: last.sales,
                trend: calcTrend(previous.sales, last.sales),
            },
            revenue: {
                previous: previous.revenue,
                last: last.revenue,
                trend: calcTrend(previous.revenue, last.revenue),
            },
            completionRate: {
                previous: previous.completionRate,
                last: last.completionRate,
                trend: calcTrend(previous.completionRate, last.completionRate),
            },
        };
    }
}
