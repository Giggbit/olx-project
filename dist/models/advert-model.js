var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DataType, Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Category } from "./category-models.js";
import { v4 as uuidv4 } from 'uuid';
let Advert = class Advert extends Model {
    userId;
    categoryId;
    title;
    description;
    price;
    location;
    isAvailable;
    user;
    category;
};
__decorate([
    Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    })
], Advert.prototype, "id", void 0);
__decorate([
    ForeignKey(() => User),
    Column({
        type: DataType.UUID,
        allowNull: false,
    })
], Advert.prototype, "userId", void 0);
__decorate([
    ForeignKey(() => Category),
    Column({
        type: DataType.UUID,
        allowNull: false,
    })
], Advert.prototype, "categoryId", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false,
    })
], Advert.prototype, "title", void 0);
__decorate([
    Column({
        type: DataType.TEXT,
        allowNull: false,
    })
], Advert.prototype, "description", void 0);
__decorate([
    Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
], Advert.prototype, "price", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: true,
    })
], Advert.prototype, "location", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
], Advert.prototype, "isAvailable", void 0);
__decorate([
    BelongsTo(() => User)
], Advert.prototype, "user", void 0);
__decorate([
    BelongsTo(() => Category)
], Advert.prototype, "category", void 0);
Advert = __decorate([
    Table({
        tableName: "listings",
        timestamps: true,
    })
], Advert);
export { Advert };
