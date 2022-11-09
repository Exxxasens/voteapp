import RegisterUserDto from "../dto/user/register.user.dto";
import * as jwt from "jsonwebtoken";

const SECRET = process.env.TOKEN_SECRET;

export default class UserService {
    static registerUser({ username }: RegisterUserDto) {
        const token = jwt.sign({ username }, SECRET, {});
        return token;
    }
}
