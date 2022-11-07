import RegisterUserDto from "./register.user.dto";

export default interface UserDto extends RegisterUserDto {
    _id: string;
}
