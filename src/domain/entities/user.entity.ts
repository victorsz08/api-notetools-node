import dateGenerate from "../../package/patterns/date-generate";
import generateId from "../../package/patterns/generate-id";
import hashPattern from "../../package/patterns/hash-pattern";
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
      id: generateId.generate(),
      username,
      firstName,
      lastName,
      password: await hashPattern.hash(password),
      role: Role.USER,
      createdAt: dateGenerate.generate(),
      updatedAt: dateGenerate.generate(),
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
