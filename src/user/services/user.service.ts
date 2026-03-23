import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { differenceInYears } from 'date-fns';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) { }

    async findByUser(user: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                user: user
            }
        })
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();

    }

    async findById(id: number): Promise<User> {

        const user = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if (!user)
            throw new HttpException('User não encontrado!', HttpStatus.NOT_FOUND);

        return user;

    }

    async create(user: User): Promise<User> {
        
        const findUser = await this.findByUser(user.user);

        if (findUser)
            throw new HttpException("O User já existe!", HttpStatus.BAD_REQUEST);

       	if (this.calculateAge(user.dateOfBirth) < 18)
            throw new HttpException('Usuário menor de idade!', HttpStatus.BAD_REQUEST);

        user.password = await this.bcrypt.hashPassword(user.password)
        return await this.userRepository.save(user);

    }

    async update(user: User): Promise<User> {

        await this.findById(user.id);

        const findUser = await this.findByUser(user.user);

        if (findUser && findUser.id !== user.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        if (this.calculateAge(user.dateOfBirth) < 18)
            throw new HttpException('Usuário menor de idade!', HttpStatus.BAD_REQUEST);

        user.password = await this.bcrypt.hashPassword(user.password)
        return await this.userRepository.save(user);

    }

    public calculateAge(dateOfBirth: Date): number {

        return differenceInYears(new Date(), dateOfBirth);
        
    }
}