import { DataType, Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Category } from "./category-models.js";

@Table({
    tableName: "listings",
    timestamps: true,
})
export class Advert extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    categoryId!: number;

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
