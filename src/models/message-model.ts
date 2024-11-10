import { DataType, Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Advert } from "./advert-model.js";
import { v4 as uuidv4 } from 'uuid'

@Table({
    tableName: "messages",
    timestamps: true,
})
export class Message extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare senderId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare receiverId: number;

    @ForeignKey(() => Advert)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare advertId: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare content: string;

    @BelongsTo(() => User, "senderId")
    declare sender: User;

    @BelongsTo(() => User, "receiverId")
    declare receiver: User;

    @BelongsTo(() => Advert, "advertId")
    declare advert: Advert;
}
