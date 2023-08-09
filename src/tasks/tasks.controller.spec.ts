import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.model';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Tests that getAllTasks() returns an array of tasks
  it('should return an array of tasks', () => {
    const result = controller.getAllTasks();
    expect(Array.isArray(result)).toBe(true);
  });

  // Tests that getTaskById(id) returns the correct task
  it('should return the correct task', () => {
    const task = controller.createTask({
      title: 'Test Task',
      description: 'Test Description',
    });
    const result = controller.getTaskById(task.id);
    expect(result).toEqual(task);
  });

  // Tests that deleteTask(id) removes the correct task
  it('should remove the correct task', () => {
    const task = controller.createTask({
      title: 'Test Task',
      description: 'Test Description',
    });
    controller.deleteTask(task.id);
    const result = controller.getTaskById(task.id);
    expect(result).toBeUndefined();
  });

  // Tests that updateTask(id, status) updates the correct task
  it('should update the correct task', () => {
    const task = controller.createTask({
      title: 'Test Task',
      description: 'Test Description',
    });
    const updatedTask = controller.updateTask(task.id, TaskStatus.IN_PROGRESS);
    expect(updatedTask.status).toEqual(TaskStatus.IN_PROGRESS);
  });

  // Tests that createTask(createTaskDto) creates a new task
  it('should create a new task', () => {
    const createTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    };
    const result = controller.createTask(createTaskDto);
    expect(result.title).toEqual(createTaskDto.title);
    expect(result.description).toEqual(createTaskDto.description);
  });

  // Tests that createTask(createTaskDto) throws an error if title is empty or description is empty
  it('should throw an error if title is empty or description is empty', () => {
    expect(() =>
      controller.createTask({ title: '', description: 'Test Description' }),
    ).toThrowError('title is required');
    expect(() =>
      controller.createTask({ title: 'Test Task', description: '' }),
    ).toThrowError('description is required');
  });
});
