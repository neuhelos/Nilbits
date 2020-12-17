import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core"
import path from 'path'


export default {
    migrations: {
        path: path.join(__dirname, "./migrations"), // path to the folder with migrations //create absolute path using node 'path' module, 
        //__dirname is absolute path for the folder where the file being run is in
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files - only ts or js
    },
    dbName: 'nilbits',
    type: 'postgresql',
    entities: [Post],
    //user: '', //postgreSQL user login
    //password: '',
    debug: !__prod__,
} as Parameters <typeof MikroORM.init>[0]; //grabbing type of function for config init object and parameter types of expected by function. Parameters returns array
//get more autocompletion with Parameters, though not strict on properties (keys) added

//Or in TS can use:
//as const; //casting to const, expecting types of properties, not entity/object as string