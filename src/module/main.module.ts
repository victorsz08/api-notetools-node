import { AuthLoginUsecase } from "./../usecases/auth/login.usecase";
import { UpdateUserUsecase } from "./../usecases/user/update.usecase";
import { FindUserUsecase } from "./../usecases/user/find.usecase";
import { AuthRepository } from "../infra/repositories/auth.repository.prisma";
import { OrderRepository } from "../infra/repositories/order.repository.prisma";
import { UserRepository } from "../infra/repositories/user.repository.prisma";
import { prisma } from "../package/prisma-client/prisma-client";
import { CreateOrderUsecase } from "../usecases/order/create.usecase";
import { DeleteOrderUsecase } from "../usecases/order/delete.usecase";
import { FindOrderUsecase } from "../usecases/order/find.usecase";
import { ListOrderUsecase } from "../usecases/order/list.usecase";
import { UpdateSchedulingUsecase } from "../usecases/order/update-scheduling.usecase";
import { UpdateStatusUsecase } from "../usecases/order/update-status.usecase";
import { UpdateOrderUsecase } from "../usecases/order/update.usecase";
import { CreateUserUsecase } from "../usecases/user/create.usecase";
import { ListUserUsecase } from "../usecases/user/list.usecase";
import { UpdatePasswordUsecase } from "../usecases/user/update-password.usecase";
import { DeleteUserUsecase } from "../usecases/user/delete.usecase";
import { CreateOrderRoute } from "../infra/api/express/routes/order/create.route.express";
import { FindOrderRoute } from "../infra/api/express/routes/order/find.route.express";
import { ListOrderRoute } from "../infra/api/express/routes/order/list.route.express";
import { UpdateOrderRoute } from "../infra/api/express/routes/order/update.route.express";
import { UpdateStatusRoute } from "../infra/api/express/routes/order/update-status.route.express";
import { UpdateSchedulingRoute } from "../infra/api/express/routes/order/update-scheduling.route.express";
import { DeleteOrderRoute } from "../infra/api/express/routes/order/delete.route.express";
import { CreateUserRoute } from "../infra/api/express/routes/user/create.route.express";
import { FindUserRoute } from "../infra/api/express/routes/user/find.route.express";
import { ListUserRoute } from "../infra/api/express/routes/user/list.route.express";
import { UpdateUserRoute } from "../infra/api/express/routes/user/update.route.express";
import { UpdatePasswordRoute } from "../infra/api/express/routes/user/update-password.route.express";
import { DeleteUserRoute } from "../infra/api/express/routes/user/delete.route.express";
import { AuthLoginRoute } from "../infra/api/express/routes/auth/login.route.express";
import { AuthLogoutRoute } from "../infra/api/express/routes/auth/logout.route.express";
import { AuthSessionRoute } from "../infra/api/express/routes/auth/session.route.express";

// repositories
const userRepository = UserRepository.build(prisma);
const orderRepository = OrderRepository.build(prisma);
const authRepository = AuthRepository.build(prisma);

// usecases
const createOrderUsecase = CreateOrderUsecase.build(orderRepository);
const findOrderUsecase = FindOrderUsecase.build(orderRepository);
const listOrderUsecase = ListOrderUsecase.build(orderRepository);
const updateOrderUsecase = UpdateOrderUsecase.build(orderRepository);
const updateStatusUseacse = UpdateStatusUsecase.build(orderRepository);
const updateSchedulingUsecase = UpdateSchedulingUsecase.build(orderRepository);
const deleteOrderUsecase = DeleteOrderUsecase.build(orderRepository);

const createUserUsecase = CreateUserUsecase.build(userRepository);
const findUserUsecase = FindUserUsecase.build(userRepository);
const listUserUsecase = ListUserUsecase.build(userRepository);
const updateUserUsecase = UpdateUserUsecase.build(userRepository);
const updatePasswordUsecase = UpdatePasswordUsecase.build(userRepository);
const deleteUserUsecase = DeleteUserUsecase.build(userRepository);

const authLoginUsecase = AuthLoginUsecase.build(authRepository);

// routes
const createOrderRoute = CreateOrderRoute.build(createOrderUsecase);
const findOrderRoute = FindOrderRoute.build(findOrderUsecase);
const listOrderRoute = ListOrderRoute.build(listOrderUsecase);
const updateOrderRoute = UpdateOrderRoute.build(updateOrderUsecase);
const updateStatusRoute = UpdateStatusRoute.build(updateStatusUseacse);
const updateSchedulingRoute = UpdateSchedulingRoute.build(
    updateSchedulingUsecase
);
const deleteOrderRoute = DeleteOrderRoute.build(deleteOrderUsecase);

const createUserRoute = CreateUserRoute.build(createUserUsecase);
const findUserRoute = FindUserRoute.build(findUserUsecase);
const listUserRoute = ListUserRoute.build(listUserUsecase);
const updateUserRoute = UpdateUserRoute.build(updateUserUsecase);
const updatePasswordRoute = UpdatePasswordRoute.build(updatePasswordUsecase);
const deleteUserRoute = DeleteUserRoute.build(deleteUserUsecase);

const authLoginRoute = AuthLoginRoute.build(authLoginUsecase);
const authLogoutRoute = AuthLogoutRoute.build();
const authSessionRoute = AuthSessionRoute.build();

export const routes = [
    createOrderRoute,
    findOrderRoute,
    listOrderRoute,
    updateOrderRoute,
    updateStatusRoute,
    updateSchedulingRoute,
    deleteOrderRoute,
    createUserRoute,
    findUserRoute,
    listUserRoute,
    updateUserRoute,
    updatePasswordRoute,
    deleteUserRoute,
    authLoginRoute,
    authLogoutRoute,
    authSessionRoute,
];
