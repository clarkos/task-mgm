import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.model';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Tests that createTask successfully creates a task with valid title and description, and adds it to the tasks array
  it('should create a task with valid title and description and add it to the tasks array', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'This is a test task',
    };
    const task = service.createTask(createTaskDto);
    expect(task).toBeDefined();
    expect(task.id).toBeDefined();
    expect(task.title).toEqual(createTaskDto.title);
    expect(task.description).toEqual(createTaskDto.description);
    expect(task.status).toEqual(TaskStatus.OPEN);
    expect(service.getAllTasks()).toContain(task);
  });

  // Tests that createTask throws an error when description is empty
  it('should throw an error when description is empty', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      description: '',
    };
    expect(() => service.createTask(createTaskDto)).toThrow();
  });

  // Tests that createTask throws an error when title is empty
  it('should throw an error when title is empty', () => {
    const createTaskDto: CreateTaskDto = {
      title: '',
      description: 'This is a test task',
    };
    expect(() => service.createTask(createTaskDto)).toThrow();
  });

  // Tests that multiple tasks created have unique ids
  it('should create multiple tasks with unique ids', () => {
    const createTaskDto1: CreateTaskDto = {
      title: 'Test Title 1',
      description: 'Test Description 1',
    };
    const createTaskDto2: CreateTaskDto = {
      title: 'Test Title 2',
      description: 'Test Description 2',
    };
    const task1 = service.createTask(createTaskDto1);
    const task2 = service.createTask(createTaskDto2);
    expect(task1.id).toBeDefined();
    expect(task2.id).toBeDefined();
    expect(task1.id).not.toEqual(task2.id);
  });

  // Tests that a task can be created and retrieved by its id
  it('should create a task and retrieve it by its id', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Title',
      description: 'Test Description',
    };
    const task = service.createTask(createTaskDto);
    const retrievedTask = service.getTaskById(task.id);
    expect(retrievedTask).toEqual(task);
  });

  // Tests that an empty array is returned when there are no tasks
  it('should return an empty array when there are no tasks', () => {
    const tasks = service.getAllTasks();
    expect(tasks).toEqual([]);
  });

  // Tests that a task can be created and deleted by its id
  it('should create a task and delete it by its id', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'This is a test task',
    };
    const task = service.createTask(createTaskDto);
    expect(task).toBeDefined();
    expect(task.id).toBeDefined();
    expect(task.title).toEqual(createTaskDto.title);
    expect(task.description).toEqual(createTaskDto.description);
    expect(task.status).toEqual(TaskStatus.OPEN);
    expect(service.getAllTasks()).toContain(task);
    service.deleteTask(task.id);
    expect(service.getTaskById(task.id)).toBeUndefined();
  });
});
