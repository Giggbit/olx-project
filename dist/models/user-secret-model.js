var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DataType, Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";
let UserSecret = class UserSecret extends Model {
    userId;
    secretKey;
    user;
};
__decorate([
    ForeignKey(() => User),
    Column({
        type: DataType.UUID,
        allowNull: false,
        unique: true,
    })
], UserSecret.prototype, "userId", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false,
    })
], UserSecret.prototype, "secretKey", void 0);
__decorate([
    BelongsTo(() => User)
], UserSecret.prototype, "user", void 0);
UserSecret = __decorate([
    Table({
        tableName: "user_secrets",
        timestamps: false,
    })
], UserSecret);
export { UserSecret };
