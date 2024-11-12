import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user-model.js";
import { UserSecret } from "../models/user-secret-model.js";
import { Category } from "../models/category-models.js";
import { Advert } from "../models/advert-model.js";
import { Message } from "../models/message-model.js";
import { AdvertImage } from "../models/advert-image-model.js";
export const connection = new Sequelize({
    dialect: "mysql",
    timezone: "+01:00",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [User, UserSecret, Category, Advert, Message, AdvertImage],
});
