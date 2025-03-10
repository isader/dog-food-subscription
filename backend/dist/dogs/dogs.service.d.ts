import { Repository } from 'typeorm';
import { Dog } from './entities/dog.entity';
import { CreateDogDto } from './dto/create-dog.dto';
export declare class DogsService {
    private dogsRepository;
    constructor(dogsRepository: Repository<Dog>);
    create(createDogDto: CreateDogDto): Promise<Dog>;
    findAll(): Promise<Dog[]>;
    findOne(id: string): Promise<Dog>;
    update(id: string, updateDogDto: Partial<CreateDogDto>): Promise<Dog>;
    remove(id: string): Promise<void>;
}
