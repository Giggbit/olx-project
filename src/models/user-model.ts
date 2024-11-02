import { DataType, Model, Column, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

enum UserRoles {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest",
    SELLER = "seller",  
}

@Table({
    tableName: "users",
    timestamps: true,
})
export class User extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    })
    declare id:string;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    declare login: string;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @Column({
        type: DataType.ENUM(...Object.values(UserRoles)),
        allowNull: false,
        defaultValue: UserRoles.GUEST,
    })
    declare role:UserRoles;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare resetPasswordToken: string | null;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare resetPasswordExpires: Date | null;
};