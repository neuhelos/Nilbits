import argon2 from 'argon2'
import { User } from '../entities/User'
import { MyContext } from 'src/types'
import {Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver} from 'type-graphql'

@InputType() //arguments in mutations
class UsernamePasswordInput {
    @Field(() => String)
    username: string
    @Field(() => String)
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType() //for returning objects from mutations
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[] //? - can be undefined

    @Field(() => User, {nullable: true})
    user?: User
}

@Resolver()
export class UserResolver {
    
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput, //Don't need to specify Arg type, inferred as () => UsernamePasswordInput
        @Ctx() { em }: MyContext

    ): Promise<UserResponse> {
        
        if(options.username.length <= 3) {
            return {
                errors: [
                {
                    field: "username",
                    message: "Username Must Be Greater Than 3 Characters"
                }
                
                ]
            }
        }

        if(options.password.length <= 3) {
            return {
                errors: [
                {
                    field: "username",
                    message: "Username Must Be Greater Than 3 Characters"
                }
                ]
            }
        }
        
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User, { 
            username: options.username,
            password: hashedPassword
            })

        try {
            await em.persistAndFlush(user)

        } catch (error) {
            //duplicate username error
            if(error.code === '23505' || error.detail.includes("already exists")){
            //console.log("Message :", error)
                return {
                    errors: [
                    {
                        field: "username",
                        message: "Username Has Already Been Taken"
                    }
                    ]
                }
            }
        }
        return { user }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, {username: options.username})
        if(!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "User Doesn't Exist"
                    },
                ]
            }
        }

        const valid = await argon2.verify(user.password, options.password)
        if(!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Incorrect Password"
                    },
                ]
            
            }
        
        }

        return {
            user
        }
    }


}