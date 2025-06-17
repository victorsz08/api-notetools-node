import GenerateDate from "../../package/patterns/date-generate";
import GenerateUUID from "../../package/patterns/generate-id";
import HashPattern from "../../package/patterns/hash-pattern";
import { Role } from "../enum/role.enum";

type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: Role;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserEntity {
  private constructor(private readonly props: User) {}

  public static async build(
    username: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    return new UserEntity({
      id: GenerateUUID.uuid(),
      username,
      firstName,
      lastName,
      password: await HashPattern.hash(password),
      role: Role.USER,
      createdAt: GenerateDate.now(),
      updatedAt: GenerateDate.now(),
    });
  }

  public static with(props: User) {
    return new UserEntity(props);
  }

  public get id() {
    return this.props.id;
  }

  public get username() {
    return this.props.username;
  }

  public get firstName() {
    return this.props.firstName;
  }

  public get lastName() {
    return this.props.lastName;
  }

  public get role() {
    return this.props.role;
  }

  public get password() {
    return this.props.password;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
