import {
  AuthDatasouce,
  AuthRepository,
  LoginDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasouce) {}

  login(loginDto: LoginDto): Promise<UserEntity> {
    return this.authDatasource.login(loginDto);
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}
