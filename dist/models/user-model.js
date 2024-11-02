var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DataType, Model, Column, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "admin";
    UserRoles["USER"] = "user";
    UserRoles["GUEST"] = "guest";
    UserRoles["SELLER"] = "seller";
})(UserRoles || (UserRoles = {}));
let User = class User extends Model {
};
__decorate([
    Column({
        type: DataType.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    })
], User.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
], User.prototype, "login", void 0);
__decorate([
    Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
], User.prototype, "email", void 0);
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false,
    })
], User.prototype, "password", void 0);
__decorate([
    Column({
        type: DataType.ENUM(...Object.values(UserRoles)),
        allowNull: false,
        defaultValue: UserRoles.GUEST,
    })
], User.prototype, "role", void 0);
User = __decorate([
    Table({
        tableName: "users",
        timestamps: true,
    })
], User);
export { User };
;
