import AppDataSource from "../../configs/dbConfig";
import { Chat } from "./chat.entity";
import ExcelJS from "exceljs";


const ChatRepository = AppDataSource.getRepository(Chat);

export async function createChat(params) {
    try {
        const { message, status, userId } = params
        const createdChat = await ChatRepository.save({
            user: userId,
            message: message,
            status: status
        })
        return createdChat
    } catch (error) {
        throw error
    }
}

export async function getChats(query) {
    try {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const status = query.status;

        const offset = (page - 1) * limit;

        const where: any = {};
        if (status) {
            where.status = status;
        }

        const [chats, total] = await ChatRepository.findAndCount({
            where,
            skip: offset,
            take: limit,
            order: { createdAt: "DESC" },
        });

        return {
            data: chats,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    } catch (error) {
        console.error("Error fetching chats:", error);
        throw error;
    }
}


export async function exportChatsToExcel() {
    const chats = await ChatRepository.find({
        order: { createdAt: "DESC" },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Chats");

    // Define columns
    worksheet.columns = [
        { header: "ID", key: "id", width: 36 },
        { header: "Message", key: "message", width: 40 },
        { header: "Status", key: "status", width: 15 },
        { header: "Created At", key: "createdAt", width: 25 },
    ];

    // Add rows
    chats.forEach(chat => {
        worksheet.addRow({
            id: chat.id,
            message: chat.message,
            status: chat.status,
            createdAt: chat.createdAt,
        });
    });

    // Generate buffer to send to controller
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}
