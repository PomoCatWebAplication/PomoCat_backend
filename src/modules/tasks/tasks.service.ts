import { Injectable } from '@nestjs/common';
import { CreateTaskDto, TaskState } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
  const createdTask = new this.taskModel({ ...createTaskDto, userId });
  await createdTask.save();
  return this.taskModel.findById(createdTask._id).exec();
}

  findAllTasks() {
    return this.taskModel.find().exec();
  }

  findAll(userId: string) {
    return this.taskModel.find({ userId }).exec();
  }

  findOne(id: string) {
    return this.taskModel.findOne({ _id: id}).exec();
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findOneAndUpdate({ _id: id}, updateTaskDto, { new: true }).exec();
  }

  completeTask(id: string) {
    return this.taskModel.findOneAndUpdate({ _id: id }, { state: TaskState.COMPLETED }, { new: true }).exec();
  }

  remove(id: string) {
    return this.taskModel.findOneAndDelete({ _id: id}).exec();
  }
}
