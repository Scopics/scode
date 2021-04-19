import { Test, TestingModule } from '@nestjs/testing';
import { EncodeController } from './encode.controller';

describe('EncodeController', () => {
  let controller: EncodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncodeController],
    }).compile();

    controller = module.get<EncodeController>(EncodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
