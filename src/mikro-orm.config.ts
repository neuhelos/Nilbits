import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core"

export default {
    dbName: 'nilbits',
    type: 'postgresql',
    entities: [Post],
    //user: '', //postgreSQL user login
    //password: '',
    debug: !__prod__,
} as Parameters <typeof MikroORM.init>[0]; //grabbing type of function and types of Parameters

//as const; //casting to const, expecting types of properties, not entity/object as string