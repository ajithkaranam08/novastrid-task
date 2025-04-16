import path from "path";
import { DataSource } from "typeorm";
import {User} from '../components/user/user.entity'

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "node-sequelize",
    synchronize: true,
    entities: [User],
})

export default AppDataSource