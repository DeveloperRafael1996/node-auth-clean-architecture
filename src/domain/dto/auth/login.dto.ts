import { Validators } from "../../../config";

export class LoginDto {
  private constructor(public email: string, public password: string) {}

  static create(data: { [key: string]: any }): [string?, LoginDto?] {
    const { email, password } = data;

    if (!email) return ["Missing Email"];
    if (!Validators.email.test(email)) return ["Missing Email Is Not Valid"];
    if (!password) return ["Missing Password"];
    if (password.length < 6) return ["Password Too Short"];

    return [undefined, new LoginDto(email, password)];
  }
}
