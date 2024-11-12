var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DataType, Model, Column, Table, ForeignKey } from "sequelize-typescript";
import { Advert } from "./advert-model.js";
import { v4 as uuidv4 } from 'uuid';
let AdvertImage = class AdvertImage extends Model {
};
__decorate([
    Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    })
], AdvertImage.prototype, "id", void 0);
__decorate([
    ForeignKey(() => Advert),
    Column({
        type: DataType.UUID,
        allowNull: false,
    })
], AdvertImage.prototype, "advertId", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false,
    })
], AdvertImage.prototype, "imagePath", void 0);
AdvertImage = __decorate([
    Table({
        tableName: "advert_images"
    })
], AdvertImage);
export { AdvertImage };
