import argon2 from 'argon2'
import { User } from '../entities/User'
import { MyContext } from 'src/types'
import {Arg, Ctx, Field, InputType, Mutation, Resolver} from 'type-graphql'

@InputType()
class UsernamePasswordInput {
    @Field(() => String)
    username: string
    @Field(() => String)
    password: string
}

@Resolver()
export class UserResolver {
    
    @Mutation(() => User)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext

    ) {
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User, { 
            username: options.username,
            password: hashedPassword
            })
        await em.persistAndFlush(user)
        return user
    }

}