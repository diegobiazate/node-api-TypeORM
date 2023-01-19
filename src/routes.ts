import { Router } from "express";
import { RoomController } from "./controllers/roomController";
import { SubjectController } from "./controllers/subjectController";
import { VideoController } from "./controllers/videoController";

const routes = Router();

routes.post('/subject', new SubjectController().create)
routes.post('/room', new RoomController().create)
routes.get('/room', new RoomController().list)
routes.put('/room/addSubject', new RoomController().roomSubject)
routes.post('/video', new VideoController().create)

export default routes;