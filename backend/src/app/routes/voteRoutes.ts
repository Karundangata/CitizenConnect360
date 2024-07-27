import {Router} from 'express'
import { addVote, deleteVote, getSpecificPollVotes, getVotes, updateVote } from '../controllers/voteControllers'
import { roleBasedToken } from '../middleware'


const voteRouter = Router()

voteRouter.post("/add-vote",roleBasedToken, addVote)
voteRouter.get("",getVotes)
voteRouter.get("/:id", getSpecificPollVotes)
voteRouter.patch("/update-vote/:id", updateVote)
voteRouter.delete("/:id",roleBasedToken, deleteVote)


export default voteRouter
