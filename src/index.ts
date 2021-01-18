import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";

const main = async () => { //In a 'main' function to access/use async/await

    //Connect to database
    const orm = await MikroORM.init(microConfig); //method calls/returns a promise 
    //Run migrations
    await orm.getMigrator().up();

    const app = express();

    
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({ //buildSchema returns promise
            resolvers: [HelloResolver],
            validate: false, //uses Class package as a validator, here turning it off

        }) 
    })

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('Server Party @4000')
    })

    //Run SQL
    //const post = orm.em.create(Post, {title: 'My First Post 1'})
    //await orm.em.persistAndFlush(post) //SQL Insert through MikroORM
    //console.log('--------SQL 2-----------')
    //await orm.em.nativeInsert(Post, {title: "My First Post 2"})

    //const posts = await orm.em.find(Post, {});
    //console.log(posts)

}

main().catch( error => {
    console.error(error)
})



console.log("NILBITS")