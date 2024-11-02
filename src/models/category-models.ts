import { DataType, Model, Column, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid'

@Table({
    tableName: "categories",
    timestamps: false,
})
export class Category extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    })
    declare id: string;

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
