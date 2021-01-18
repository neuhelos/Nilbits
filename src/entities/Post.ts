import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity() // Database Table Decorator

export class Post {

    @PrimaryKey()
    id!: number;

    @Property({type: 'date'}) //Database Column // default: NOW()
    createdAt = new Date();

    @Property({ type: 'date', onUpdate: () => new Date() }) //Hook for DB Column
    updatedAt = new Date();

    @Property({type: 'text'})
    title!: string;

}