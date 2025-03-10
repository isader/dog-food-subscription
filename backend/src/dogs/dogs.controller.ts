import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './entities/dog.entity';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  create(@Body() createDogDto: CreateDogDto): Promise<Dog> {
    return this.dogsService.create(createDogDto);
  }

  @Get()
  findAll(): Promise<Dog[]> {
    return this.dogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Dog> {
    return this.dogsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDogDto: Partial<CreateDogDto>,
  ): Promise<Dog> {
    return this.dogsService.update(id, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.dogsService.remove(id);
  }
}