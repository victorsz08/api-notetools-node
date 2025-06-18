export interface AuthInterface {
    login(username: string, password: string): Promise<string>;
}
