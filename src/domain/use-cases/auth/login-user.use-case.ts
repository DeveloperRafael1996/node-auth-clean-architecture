import { RegisterUserDto } from "../../dto/auth/register-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors/custom.error";
import { LoginDto } from "../../dto/auth/login.dto";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SingToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly singToken: SingToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);
    const token = await this.singToken({ id: user.id }, "2h");

    if (!token) {
      throw CustomError.internalServer("Error Generating Token");
    }

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
