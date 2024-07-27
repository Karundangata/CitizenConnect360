import {Router} from 'express'
import { changePassword, deleteUser, forgotPassword, getUserByEmail, getUserById, getUsers, loginUser, registerUser, updateUser } from '../controllers/authControllers'
import { roleBasedToken } from '../middleware'


const authRouter = Router()

authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)
authRouter.post("/change-password/:id",changePassword)
authRouter.post("/forgot-password",forgotPassword)
authRouter.get("/users", roleBasedToken, getUsers)
authRouter.get("/user-email", roleBasedToken, getUserByEmail)
authRouter.get("/:id", roleBasedToken, getUserById)
authRouter.patch("/:id",updateUser)
authRouter.delete("/:id", roleBasedToken, deleteUser)


export default authRouter
