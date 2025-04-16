import * as userService from './user.service'

export async function createUser(req, res, next) {
    try {
        const createdUser = await userService.createUser(req.body)
        return res.json({
            data: createdUser,
            success: true
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}