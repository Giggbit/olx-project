import { DataType, Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Category } from "./category-models.js";
import { v4 as uuidv4 } from 'uuid'

@Table({
    tableName: "adverts",
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
    declare userId: string;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare categoryId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare description: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare price: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare location?: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    declare isAvailable: boolean;

    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Category)
    declare category: Category;
}
