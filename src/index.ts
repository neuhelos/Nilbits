import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";


const main = async () => {

    const orm = await MikroORM.init({ //method calls a promise
        dbName: 'nilbits',
        type: 'postgresql',
        entities: [Post],
        user: '', //postgreSQL user login
        password: '',
        debug: !__prod__,
    });

    const post = orm.em.create(Post, {title: 'My First Post 1'})
    await orm.em.persistAndFlush(post)
    console.log('sql 2')
    await orm.em.nativeInsert(Post, {title: "My Frist Post 2"})

}

main()





console.log("hello world")