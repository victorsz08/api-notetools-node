import { compare, hash } from "bcryptjs";

class HashPattern {
  public async hash(str: string): Promise<string> {
    return await hash(str, 10);
  }

  public async compare(str: string, hash: string): Promise<boolean> {
    return await compare(str, hash);
  }
}

export default new HashPattern();
