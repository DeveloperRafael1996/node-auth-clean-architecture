import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(data: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = data;

    if (!name) return ["Missing Name"];
    if (!email) return ["Missing Email"];
    if (!Validators.email.test(email)) return ["Missing Email Is Not Valid"];
    if (!password) return ["Missing Password"];
    if (password.length < 6) return ["Password Too Short"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
