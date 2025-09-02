import { Test, TestingModule } from '@nestjs/testing';
import { DailyPlansController } from './daily-plans.controller';
import { DailyPlansService } from './daily-plans.service';

describe('DailyPlansController', () => {
  let controller: DailyPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyPlansController],
      providers: [DailyPlansService],
    }).compile();

    controller = module.get<DailyPlansController>(DailyPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
