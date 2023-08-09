import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  xit('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
