import { DataType, Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Advert } from "./advert-model.js";

@Table({
    tableName: "messages",
    timestamps: true,
})
export class Message extends Model {
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
    senderId!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    receiverId!: number;

    @ForeignKey(() => Advert)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    advertId!: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content!: string;

    @BelongsTo(() => User, "senderId")
    sender!: User;

    @BelongsTo(() => User, "receiverId")
    receiver!: User;

    @BelongsTo(() => Advert)
    listing!: Advert;
}
