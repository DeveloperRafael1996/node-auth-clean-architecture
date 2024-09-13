import { RegisterUserDto } from "../../dto/auth/register-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors/custom.error";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
type SingToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly singToken: SingToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this.authRepository.register(registerUserDto);
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
