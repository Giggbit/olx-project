import { DataType, Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Category } from "./category-models.js";
import { v4 as uuidv4 } from 'uuid'

@Table({
    tableName: "listings",
    timestamps: true,
})
export class Advert extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    })
    declare id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId!: string;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    categoryId!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    location?: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    isAvailable!: boolean;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Category)
    category!: Category;
}
