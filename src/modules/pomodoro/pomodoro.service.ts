import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePomodoroDto } from './dto/create-pomodoro.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PomodoroSession, PomodoroSessionDocument } from './schemas/pomodoro.schema';
import { isValidObjectId, Model, Types } from 'mongoose';
import { UpdatePomodoroDto } from './dto/update-pomodoro.dto';

@Injectable()
export class PomodoroService {

  constructor(@InjectModel(PomodoroSession.name) private pomodoroModel: Model<PomodoroSessionDocument>) {}

  ensureUserExists(userId: string) {
    if(!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid ID');
    }
  }

  async createPomodoroSession(dto: CreatePomodoroDto) {
    const doc = new this.pomodoroModel({
      ...dto,
      taskId: new Types.ObjectId(dto.taskId),
      userId: new Types.ObjectId(dto.userId),
    });
    return doc.save();
  }

  async completePomodoro(id: string) {
    this.ensureUserExists(id);
    return this.pomodoroModel.findByIdAndUpdate(id, { completed: true, endTime: new Date() }, { new: true }).exec();
  }

  findAll() {
    return this.pomodoroModel.find().exec();
  }

  findAllByUser(userId: string) {
    return this.pomodoroModel.find({ userId: new Types.ObjectId(userId) }).sort({ startTime: -1 }).exec();
  }

  findOne(id: string) {
    return this.pomodoroModel.findById(id).exec();
  }

  update(id: string, dto: UpdatePomodoroDto) {
    const patch: any = { ...dto };
    if (dto.taskId) {
      patch.taskId = new Types.ObjectId(dto.taskId);
    }
    if (dto.userId) {
      patch.userId = new Types.ObjectId(dto.userId);
    }
    return this.pomodoroModel.findByIdAndUpdate(id, { $set: patch }, { new: true }).exec();
  }

  remove(id: string) {
    return this.pomodoroModel.findByIdAndDelete(id).exec();
  }
}
