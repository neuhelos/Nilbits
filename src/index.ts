import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";


const main = async () => {

    const orm = await MikroORM.init({ //method calls a promise
        dbName: 'nilbits',
        type: 'postgresql',
        entities: [],
        user: '', //postgreSQL user login
        password: '',
        debug: !__prod__,
    });
}

main()





console.log("hello world")