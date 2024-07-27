import {Router} from 'express'
import { addView, deleteView, getView, getViews, sensorView, updateView } from '../controllers/viewControllers'
import { roleBasedToken } from '../middleware'


const viewRouter = Router()

viewRouter.post("/add-view",addView)
viewRouter.get("",getViews)
viewRouter.patch("/update-view/:id",updateView)
viewRouter.patch("/sensor-view/:id",roleBasedToken, sensorView)
viewRouter.get("/:id",roleBasedToken, getView)
viewRouter.delete("/:id",roleBasedToken, deleteView)


export default viewRouter
