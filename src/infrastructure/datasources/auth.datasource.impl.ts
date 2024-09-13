import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasouce,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { LoginDto } from "../../domain/dto/auth/login.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFuntion = (password: string) => string;
type CompareFuntion = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasouce {
  constructor(
    private readonly hashPassword: HashFuntion = BcryptAdapter.hash,
    private readonly comparePassword: CompareFuntion = BcryptAdapter.compare
  ) {}

  async login(loginDto: LoginDto): Promise<UserEntity> {
    //Todo: Logic
    const { email, password } = loginDto;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw CustomError.badRequest("User Does Not Existes - Email");
      }
      const isMatching = this.comparePassword(password, user.password!);
      if (!isMatching) {
        throw CustomError.badRequest("Password Is Not Valid");
      }

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      //1.Verificar Email Exist
      const exists = await UserModel.findOne({ email });
      if (exists) {
        throw CustomError.badRequest("User Already Exists");
      }

      //2. Hash Password
      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
      });

      user.save();

      //3. Mapear Response
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
