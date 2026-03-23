import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UserLogin } from '../entities/userlogin.entity';


@Injectable()
export class AuthService{
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){ }

    async validateUser(username: string, password: string): Promise<any>{

        const findUser = await this.userService.findByUser(username)

        if(!findUser)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.comparePasswords(password, findUser.password)

        if(findUser && matchPassword){
            const { password, ...response } = findUser
            return response
        }

        return null

    }

    async login(userLogin: UserLogin){

        const payload = { sub: userLogin.user }
    

        const findUser = await this.userService.findByUser(userLogin.user)

        if(!findUser) throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND)

        return{
            id: findUser.id,
            name: findUser.name,
            usuario: findUser.user,
            password: '',
            userImage: findUser.userImage,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }

    }
}