import { Prisma, PrismaClient, Status } from "@prisma/client";
import {
    OrderInterface,
    ListOrderOutput,
} from "../../domain/interfaces/order.interface";
import { OrderEntity } from "../../domain/entities/order.entity";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { StatusCode } from "../../package/http-exceptions/http-status-code";
import dateGenerate from "../../package/patterns/date-generate";
import moment from "moment-timezone";

export class OrderRepository implements OrderInterface {
    private constructor(private readonly repository: PrismaClient) {}

    public static build(repository: PrismaClient) {
        return new OrderRepository(repository);
    }

    public async create(order: OrderEntity): Promise<void> {
        const {
            id,
            number,
            local,
            schedulingDate,
            schedulingTime,
            price,
            contact,
            userId,
            status,
            createdAt,
            updatedAt,
        } = order;

        const user = await this.repository.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new HttpException(
                "usuário não localizado",
                StatusCode.BAD_REQUEST
            );
        }

        await this.repository.contract.create({
            data: {
                id,
                number,
                local,
                installationDate: schedulingDate,
                installationHour: schedulingTime,
                price,
                phone: contact,
                products: [""],
                status: status as Status,
                user: { connect: { id: userId } },
                createdAt,
                updatedAt,
            },
        });

        return;
    }

    public async find(id: string): Promise<OrderEntity> {
        const order = await this.repository.contract.findUnique({
            where: { id },
        });
        if (!order) {
            throw new HttpException(
                "pedido não localizado com esse id",
                StatusCode.NOT_FOUND
            );
        }

        const output = OrderEntity.with({
            id: order.id,
            number: order.number,
            local: order.local,
            schedulingDate: order.installationDate,
            schedulingTime: order.installationHour,
            status: order.status,
            contact: order.phone,
            userId: order.userId,
            price: order.price,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        });

        return output;
    }

    public async list(
        page: number,
        limit: number,
        userId: string,
        schedulingDateIn?: Date,
        schedulingDateOut?: Date,
        createdDateIn?: Date,
        createdDateOut?: Date,
        status?: Status
    ): Promise<ListOrderOutput> {
        const orderArgs: Prisma.ContractFindManyArgs = {
            where: {
                user: {
                    id: userId,
                },
            },
            orderBy: {
                installationDate: "desc",
            },
            take: limit,
            skip: (page - 1) * limit,
        };

        const countArgs: Prisma.ContractCountArgs = {
            where: {
                user: {
                    id: userId,
                },
            },
        };

        if (status) {
            orderArgs.where = {
                ...orderArgs.where,
                status: status.toUpperCase() as Status,
            };

            countArgs.where = {
                ...countArgs.where,
                status: status.toUpperCase() as Status,
            };
        }

        if (schedulingDateIn && schedulingDateOut) {
            orderArgs.where = {
                ...orderArgs.where,
                installationDate: {
                    gte: moment
                        .tz(schedulingDateIn, "America/Sao_Paulo")
                        .startOf("day")
                        .add(1, "day")
                        .toISOString(),
                    lte: moment
                        .tz(schedulingDateOut, "America/Sao_Paulo")
                        .endOf("day")
                        .add(1, "day")
                        .toISOString(),
                },
            };

            countArgs.where = {
                ...countArgs.where,
                installationDate: {
                    gte: moment
                        .tz(schedulingDateIn, "America/Sao_Paulo")
                        .startOf("day")
                        .add(1, "day")
                        .toISOString(),
                    lte: moment
                        .tz(schedulingDateOut, "America/Sao_Paulo")
                        .endOf("day")
                        .add(1, "day")
                        .toISOString(),
                },
            };
        }

        if (createdDateIn && createdDateOut) {
            orderArgs.where = {
                ...orderArgs.where,
                createdAt: {
                    gte: moment
                        .tz(createdDateIn, "America/Sao_Paulo")
                        .startOf("day")
                        .add(1, "day")
                        .toISOString(),
                    lte: moment
                        .tz(createdDateOut, "America/Sao_Paulo")
                        .endOf("day")
                        .add(1, "day")
                        .toISOString(),
                },
            };

            countArgs.where = {
                ...countArgs.where,
                createdAt: {
                    gte: moment
                        .tz(createdDateIn, "America/Sao_Paulo")
                        .startOf("day")
                        .add(1, "day")
                        .toISOString(),
                    lte: moment
                        .tz(createdDateOut, "America/Sao_Paulo")
                        .endOf("day")
                        .add(1, "day")
                        .toISOString(),
                },
            };
        }

        const [count, orders] = await this.repository.$transaction([
            this.repository.contract.count(countArgs),
            this.repository.contract.findMany(orderArgs),
        ]);

        const totalPages = Math.ceil(count / limit);
        const orderList = orders.map((order) => {
            return OrderEntity.with({
                id: order.id,
                number: order.number,
                local: order.local,
                schedulingDate: order.installationDate,
                schedulingTime: order.installationHour,
                status: order.status,
                contact: order.phone,
                userId: order.userId,
                price: order.price,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
            });
        });

        const output: ListOrderOutput = {
            orders: orderList,
            totalPages,
            totalItems: count,
            page,
            limit,
        };

        return output;
    }

    public async update(
        id: string,
        number: number,
        local: string,
        price: number,
        contact: string,
        updatedAt: Date
    ): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                number,
                local,
                price,
                phone: contact,
                updatedAt,
            },
        });

        return;
    }

    public async updateStatus(
        id: string,
        status: Status,
        updatedAt: Date
    ): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                status: status as Status,
                updatedAt,
            },
        });

        return;
    }

    public async updateScheduling(
        id: string,
        schedulingDate: Date,
        schedulingTime: string,
        updatedAt: Date
    ): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                installationDate: schedulingDate,
                installationHour: schedulingTime,
                updatedAt,
            },
        });

        return;
    }

    public async delete(id: string): Promise<void> {
        await this.find(id);

        await this.repository.contract.delete({
            where: { id },
        });

        return;
    }
}
