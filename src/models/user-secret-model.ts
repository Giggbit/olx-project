import { DataType, Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { User } from "./user-model.js";

@Table({
    tableName: "user_secrets",
    timestamps: false,
})
export class UserSecret extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    secretKey!: string;
}
