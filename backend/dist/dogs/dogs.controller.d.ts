import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './entities/dog.entity';
export declare class DogsController {
    private readonly dogsService;
    constructor(dogsService: DogsService);
    create(createDogDto: CreateDogDto): Promise<Dog>;
    findAll(): Promise<Dog[]>;
    findOne(id: string): Promise<Dog>;
    update(id: string, updateDogDto: Partial<CreateDogDto>): Promise<Dog>;
    remove(id: string): Promise<void>;
}
