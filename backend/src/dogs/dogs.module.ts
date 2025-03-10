import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { Dog } from './entities/dog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  controllers: [DogsController],
  providers: [DogsService],
  exports: [DogsService],
})
export class DogsModule {}