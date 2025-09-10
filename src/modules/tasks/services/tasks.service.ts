import { Injectable, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression} from "@nestjs/schedule";
import { CreateTaskDto, TaskState } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../schemas/task.schema';
import { User } from 'src/modules/auth/schemas/user.schema';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

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

  async completeTask(id: string, userId: string) {
    // Completa la tarea
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id },
      { state: TaskState.COMPLETED },
      { new: true }
    ).exec();
    if (!task) return null;

    // Lógica de racha
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) return task;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const last = user.lastCompletedDate ? new Date(user.lastCompletedDate) : null;
    if (last) last.setHours(0, 0, 0, 0);

    if (!last || (today.getTime() - last.getTime()) > 24 * 60 * 60 * 1000) {
     
      user.streak = 1;
    } else if ((today.getTime() - last.getTime()) === 24 * 60 * 60 * 1000) {
      
      user.streak += 1;
    } 

    user.lastCompletedDate = today;
    await user.save();
    return task;
  }

  remove(id: string) {
    return this.taskModel.findOneAndDelete({ _id: id}).exec();
  }

  @Cron(CronExpression.EVERY_MINUTE)

  async getReminders(userId: string) {
  const ahora = new Date();
  const en5Min = new Date(ahora.getTime() + 5 * 60 * 1000);

  const tasks = await this.taskModel.find({
    userId,
    dueDate: { $lte: en5Min, $gte: ahora },
  });

  return tasks.map((task) => ({
    title: task.title,
    dueDate: task.dueDate,
    message: `⚠️ La tarea "${task.title}" vence pronto (vence: ${task.dueDate})`,
  }));
}

}
