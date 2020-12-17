import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()

export class Post {

    @PrimaryKey()
    id!: number;

    @Property() //Database Column
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() }) //Hook for DB Column
    updatedAt = new Date();

    @Property()
    title!: string;

}