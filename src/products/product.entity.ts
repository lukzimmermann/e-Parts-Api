import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    name: string;

    @Column()
    factory_number: string;

    @Column()
    category: number;

    @Column()
    minimum_quantity: number;

    @Column()
    storageplace: string;

    @Column()
    entrydate: Date;

    @Column()
    updatedate: Date;

    @Column()
    housing: string;

    @Column()
    quantity: number;

    @Column()
    manufacturer: string;
}
