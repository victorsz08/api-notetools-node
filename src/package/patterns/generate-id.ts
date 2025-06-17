import { v4 as uuid } from "uuid";

class GenerateUUID {
  public uuid(): string {
    return uuid();
  }
}

export default new GenerateUUID();
