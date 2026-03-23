import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt{

    async hashPassword(passport: string): Promise<string> {

        let salt: number = 10;
        return await bcrypt.hash(passport, salt)

    }

    async comparePasswords(enteredPassword: string, storedPassword: string): Promise<boolean> {
        return bcrypt.compare(enteredPassword, storedPassword);
    }

}