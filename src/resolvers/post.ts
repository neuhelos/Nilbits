import { Post } from '../entities/Post'
import { MyContext } from 'src/types'
import {Arg, Ctx, Int, Mutation, Query, Resolver} from 'type-graphql'

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() {em} : MyContext): Promise<Post[]> { //{em} destructuring ctx
        return em.find(Post, {}); //return promise of Post
    }

    @Query(() => Post, {nullable : true }) // return post or null 
    post(
        @Arg('id', () => Int) id: number, 
        @Ctx() {em} : MyContext
    ): Promise<Post | null > { //{em} destructuring ctx //null for SQL Unions
        
        return em.findOne(Post, { id }); //return promise of Post
    }

    @Mutation(() => Post) // return post or null 
    async createPost(
        @Arg('title') title: string, 
        @Ctx() {em} : MyContext
    ): Promise<Post> { //{em} destructuring ctx //null for SQL Unions
        
        const post = em.create(Post, {title})
        await em.persistAndFlush(post)
        return post; //return promise of Post
    }

    @Mutation(()  => Post, {nullable: true}) // return post or null 
    async updatePost(
        @Arg('id') id: number, 
        @Arg('title', () => String, { nullable: true}) title: string,  //use nullable so title can be null - for optional fields, to make something nullable, type must be explicitly set 
        @Ctx() {em } : MyContext
    ): Promise<Post | null > { 
        const post = await em.findOne(Post, {id})
        if(!post) {
            return null
        }
        if(typeof title !== 'undefined'){
            post.title = title
            await em.persistAndFlush(post)
        }
        return post;
    }

    @Mutation(()  => Boolean, { nullable: true})
    async deletePost(
        @Arg('id') id: number, 
        @Arg('title', () => String, { nullable: true}) title: string,
        @Ctx() {em } : MyContext
    ): Promise<boolean | null> { 
        const post = await em.findOne(Post, {id})
        if(!post) {
            return null
        }
        try {
            await em.nativeDelete(Post, {id})
        } catch (error) {
            return false
        }
        return true;
    }
}