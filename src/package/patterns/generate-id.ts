import { v4 as uuid } from "uuid";

class GenerateId {
  public generate(): string {
    return uuid();
  }
}

export default new GenerateId();
