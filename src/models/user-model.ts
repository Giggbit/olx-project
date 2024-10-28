import { DataType, Model, Column, Table } from "sequelize-typescript";

@Table({
    tableName: "users",
    timestamps: false,
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    login!: string;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;
};