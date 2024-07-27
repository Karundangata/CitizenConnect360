import {Router} from 'express'
import { addPoll, closePoll, deletePoll, getPoll, getPolls } from '../controllers/pollControllers'
import { roleBasedToken } from '../middleware'


const pollRouter = Router()

pollRouter.post("/add-poll",roleBasedToken, addPoll)
pollRouter.get("",getPolls)
pollRouter.get("/:id",roleBasedToken, getPoll)
pollRouter.patch("/close-poll/:id",roleBasedToken, closePoll)
pollRouter.delete("/:id",roleBasedToken, deletePoll)


export default pollRouter
