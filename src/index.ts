import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"

const main = async () => { //In a 'main' function to access/use async

    //Connect to database
    const orm = await MikroORM.init(microConfig); //method calls/returns a promise 
    
    //Run migrations
    orm.getMigrator().up();

    //Run SQL
    const post = orm.em.create(Post, {title: 'My First Post 1'})
    await orm.em.persistAndFlush(post)
    console.log('--------SQL 2-----------')
    await orm.em.nativeInsert(Post, {title: "My First Post 2"})

}

main().catch( error => {
    console.error(error)
})



console.log("NILBITS")