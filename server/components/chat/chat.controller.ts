import * as chatService from './chat.service'

export async function createChat(req, res, next) {
    try {
        const createdChat = await chatService.createChat(req.body)
        return res.json({
            data: createdChat,
            success: true
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export async function getChat(req, res, next) {
    try {
        const chatData = await chatService.getChats(req.query)
        return res.json({
            data: chatData,
            success: true
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export async function downloadChatsExcel(req, res, next) {
    try {
        const excelBuffer = await chatService.exportChatsToExcel();

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=chats.xlsx");

        return res.send(excelBuffer);
    } catch (error) {
        console.error("Error exporting Excel:", error);
        next(error);
    }
}
