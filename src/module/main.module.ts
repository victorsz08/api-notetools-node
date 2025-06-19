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
import { NoteRepository } from "../infra/repositories/note.repository.prisma";
import { CreateNoteUsecase } from "../usecases/note/create.usecase";
import { FindNoteUsecase } from "../usecases/note/find.usecase";
import { ListNoteUsecase } from "../usecases/note/list.usecase";
import { UpdateNoteUsecase } from "../usecases/note/update.usecase";
import { DeleteNoteUsecase } from "../usecases/note/delete.usecase";
import { CreateNoteRoute } from "../infra/api/express/routes/note/create.route.express";
import { FindNoteRoute } from "../infra/api/express/routes/note/find.route.express";
import { ListNoteRoute } from "../infra/api/express/routes/note/list.route.express";
import { UpdateNoteRoute } from "../infra/api/express/routes/note/update.route.express";
import { DeleteNoteRoute } from "../infra/api/express/routes/note/delete.route.express";
import { InsightRepository } from "../infra/repositories/insight.repository.prisma";
import { GetInsightUsecase } from "../usecases/insight/get-insight.usecase";
import { GetStatusInsightUsecase } from "../usecases/insight/get-status-insight.usecase";
import { GetInsightPerDayUsecase } from "../usecases/insight/get-insight-per-day.usecase";
import { GetInsightRoute } from "../infra/api/express/routes/insight/get-insight.route.express";
import { GetStatusInsightRoute } from "../infra/api/express/routes/insight/get-status-insight.route.express";
import { GetInsightPerDayRoute } from "../infra/api/express/routes/insight/get-insights-per-day.route.express";
import { AdminRepositoryPrisma } from "../infra/repositories/admin.repository.prisma";
import { RecoveryPasswordUsecase } from "../usecases/admin/recovery-password.usecase";
import { GrantedUserAccessUsecase } from "../usecases/admin/granted-user-access.usecase";
import { RecoveryPasswordRoute } from "../infra/api/express/routes/admin/recovery-password.route.express";
import { GrantedUserAccessRoute } from "../infra/api/express/routes/admin/granted-user-access.route.express";

// repositories
const userRepository = UserRepository.build(prisma);
const orderRepository = OrderRepository.build(prisma);
const authRepository = AuthRepository.build(prisma);
const noteRepository = NoteRepository.build(prisma);
const insightRepository = InsightRepository.build(prisma);
const adminRepository = AdminRepositoryPrisma.build(prisma);

// usecases

// orders
const createOrderUsecase = CreateOrderUsecase.build(orderRepository);
const findOrderUsecase = FindOrderUsecase.build(orderRepository);
const listOrderUsecase = ListOrderUsecase.build(orderRepository);
const updateOrderUsecase = UpdateOrderUsecase.build(orderRepository);
const updateStatusUseacse = UpdateStatusUsecase.build(orderRepository);
const updateSchedulingUsecase = UpdateSchedulingUsecase.build(orderRepository);
const deleteOrderUsecase = DeleteOrderUsecase.build(orderRepository);

// users
const createUserUsecase = CreateUserUsecase.build(userRepository);
const findUserUsecase = FindUserUsecase.build(userRepository);
const listUserUsecase = ListUserUsecase.build(userRepository);
const updateUserUsecase = UpdateUserUsecase.build(userRepository);
const updatePasswordUsecase = UpdatePasswordUsecase.build(userRepository);
const deleteUserUsecase = DeleteUserUsecase.build(userRepository);

// auth
const authLoginUsecase = AuthLoginUsecase.build(authRepository);

// notes
const createNoteUsecase = CreateNoteUsecase.build(noteRepository);
const findNoteUsecase = FindNoteUsecase.build(noteRepository);
const listNoteUsecase = ListNoteUsecase.build(noteRepository);
const updateNoteUsecase = UpdateNoteUsecase.build(noteRepository);
const deleteNoteUsecase = DeleteNoteUsecase.build(noteRepository);

// insights
const getInsightUsecase = GetInsightUsecase.build(insightRepository);
const getStatusInsightsUsecase =
    GetStatusInsightUsecase.build(insightRepository);
const getInsightPerDayUsecase =
    GetInsightPerDayUsecase.build(insightRepository);

// admins
const recoveryPasswordUsecase = RecoveryPasswordUsecase.build(adminRepository);
const grantedUserAccessUsecase =
    GrantedUserAccessUsecase.build(adminRepository);

// routes

// orders
const createOrderRoute = CreateOrderRoute.build(createOrderUsecase);
const findOrderRoute = FindOrderRoute.build(findOrderUsecase);
const listOrderRoute = ListOrderRoute.build(listOrderUsecase);
const updateOrderRoute = UpdateOrderRoute.build(updateOrderUsecase);
const updateStatusRoute = UpdateStatusRoute.build(updateStatusUseacse);
const updateSchedulingRoute = UpdateSchedulingRoute.build(
    updateSchedulingUsecase
);
const deleteOrderRoute = DeleteOrderRoute.build(deleteOrderUsecase);

// users
const createUserRoute = CreateUserRoute.build(createUserUsecase);
const findUserRoute = FindUserRoute.build(findUserUsecase);
const listUserRoute = ListUserRoute.build(listUserUsecase);
const updateUserRoute = UpdateUserRoute.build(updateUserUsecase);
const updatePasswordRoute = UpdatePasswordRoute.build(updatePasswordUsecase);
const deleteUserRoute = DeleteUserRoute.build(deleteUserUsecase);

// auths
const authLoginRoute = AuthLoginRoute.build(authLoginUsecase);
const authLogoutRoute = AuthLogoutRoute.build();
const authSessionRoute = AuthSessionRoute.build();

// notes
const createNoteRoute = CreateNoteRoute.build(createNoteUsecase);
const findNoteRoute = FindNoteRoute.build(findNoteUsecase);
const listNoteRoute = ListNoteRoute.build(listNoteUsecase);
const updateNoteRoute = UpdateNoteRoute.build(updateNoteUsecase);
const deleteNoteRoute = DeleteNoteRoute.build(deleteNoteUsecase);

// insights
const getInsightRoute = GetInsightRoute.build(getInsightUsecase);
const getStatusInsightRoute = GetStatusInsightRoute.build(
    getStatusInsightsUsecase
);
const getInsightPerDayRoute = GetInsightPerDayRoute.build(
    getInsightPerDayUsecase
);

// admins
const recoveryPasswordRoute = RecoveryPasswordRoute.build(
    recoveryPasswordUsecase
);
const grantedUserAccessRoute = GrantedUserAccessRoute.build(
    grantedUserAccessUsecase
);

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
    createNoteRoute,
    findNoteRoute,
    listNoteRoute,
    updateNoteRoute,
    deleteNoteRoute,
    getInsightRoute,
    getStatusInsightRoute,
    getInsightPerDayRoute,
    recoveryPasswordRoute,
    grantedUserAccessRoute,
];
