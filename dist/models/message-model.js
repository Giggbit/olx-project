var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DataType, Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Advert } from "./advert-model.js";
import { v4 as uuidv4 } from 'uuid';
let Message = class Message extends Model {
};
__decorate([
    Column({
        type: DataType.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    })
], Message.prototype, "id", void 0);
__decorate([
    ForeignKey(() => User),
    Column({
        type: DataType.UUID,
        allowNull: false,
    })
], Message.prototype, "senderId", void 0);
__decorate([
    ForeignKey(() => User),
    Column({
        type: DataType.UUID,
        allowNull: false,
    })
], Message.prototype, "receiverId", void 0);
__decorate([
    ForeignKey(() => Advert),
    Column({
        type: DataType.UUID,
        allowNull: false,
    })
], Message.prototype, "advertId", void 0);
__decorate([
    Column({
        type: DataType.TEXT,
        allowNull: false,
    })
], Message.prototype, "content", void 0);
__decorate([
    BelongsTo(() => User, "senderId")
], Message.prototype, "sender", void 0);
__decorate([
    BelongsTo(() => User, "receiverId")
], Message.prototype, "receiver", void 0);
__decorate([
    BelongsTo(() => Advert, "advertId")
], Message.prototype, "advert", void 0);
Message = __decorate([
    Table({
        tableName: "messages",
        timestamps: true,
    })
], Message);
export { Message };
