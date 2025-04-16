import path from "path";
import { DataSource } from "typeorm";
import {User} from '../components/user/user.entity'
import { Chat } from "../components/chat/chat.entity";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "node-sequelize",
    synchronize: true,
    entities: [User, Chat],
})

export default AppDataSource