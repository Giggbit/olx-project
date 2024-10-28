import { DataType, Model, Column, Table } from "sequelize-typescript";

@Table({
    tableName: "categories",
    timestamps: false,
})
export class Category extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    parentId?: number;
}
