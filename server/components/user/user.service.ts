import  argon2  from "argon2";
import AppDataSource from "../../configs/dbConfig";
import { User } from "./user.entity";

const userRepository = AppDataSource.getRepository(User);

export async function createUser(params) {
    try {
        const { name, email, password, status } = params; // Include password here
        const createdUser = userRepository.save({
            name: name,
            email: email,
            status: status || "Active", // Default to "Active" if status is not provided
            password: await argon2.hash(password) // Hash the password
        });

        return createdUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
