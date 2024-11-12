import { DataType, Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { Advert } from "./advert-model.js";
import { v4 as uuidv4 } from 'uuid'

@Table({
    tableName: "advert_images"
})
export class AdvertImage extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    })
    declare id: string;

    @ForeignKey(() => Advert)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare advertId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare imagePath: string;
}
