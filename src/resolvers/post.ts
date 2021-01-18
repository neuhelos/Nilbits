import { Post } from 'src/entities/Post'
import { MyContext } from 'src/types'
import {Ctx, Query, Resolver} from 'type-graphql'

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() {em} : MyContext): Promise<Post[]> { //{em} destructuring ctx
        return em.find(Post, {}); //return promise of Post
    }
}