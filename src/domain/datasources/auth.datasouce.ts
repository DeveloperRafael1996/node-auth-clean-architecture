import { LoginDto } from "../dto/auth/login.dto";
import { RegisterUserDto } from "../dto/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasouce {

  abstract login(loginDto: LoginDto): Promise<UserEntity>;
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
