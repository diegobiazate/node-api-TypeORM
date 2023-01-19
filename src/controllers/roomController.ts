import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { subjectRepository } from "../repositories/subjectRepository";

export class RoomController {
  async create(req: Request, res: Response){
    const { name } = req.body

    if(!name){
      return res.status(400).json({ message: 'O nome não foi enviado.' })
    }

    try {
      const newRoom = roomRepository.create({ name })

      await roomRepository.save(newRoom)

      return res.status(201).json({ newRoom })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async roomSubject(req: Request, res: Response) {
    const { room_id, subject_id } = req.body

    try {
      const room = await roomRepository.findOneBy({id: Number(room_id)})
      if(!room){
        return res.status(404).json({ message: 'Room not found' })
      }

      const subject = await subjectRepository.findOneBy({id: Number(subject_id)})

      if(!subject){
        return res.status(404).json({ message: 'subject not found' })
      }

      const updateRoom = {
        ...room,
        subjects: [subject]
      }

      await roomRepository.save(updateRoom)

      return res.status(200).json({ room })
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async list(req: Request, res: Response){

    try {
      const rooms = await roomRepository.find({
        relations:{
          subjects: true,
          videos: true
        }
      })

      return res.json({ rooms })
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}