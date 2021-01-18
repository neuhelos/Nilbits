import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

//Stacking decorators
@ObjectType() //GraphQL Decorator
@Entity() // Database Table Decorator

export class Post {

    @Field(() => Int) //Exposing Table Column to GraphQL Schema
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({type: 'date'}) //Database Column // default: NOW()
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() }) //Hook for DB Column
    updatedAt = new Date();

    @Field(() => String)
    @Property({type: 'text'})
    title!: string;

}