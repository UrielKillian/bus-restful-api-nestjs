import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}
  create(createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentRepository.create({
      ...createDepartmentDto,
    });
    return this.departmentRepository.save(department);
  }

  findAll() {
    return this.departmentRepository.find();
  }

  async findOne(departmentId: number) {
    const department = await this.departmentRepository.findOneBy({
      id: departmentId,
    });
    if (!department) {
      throw new NotFoundException(`Department with ${departmentId} not found`);
    }
    return department;
  }

  async update(departmentId: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.departmentRepository.preload({
      id: departmentId,
      ...updateDepartmentDto,
    });
    if (!department) {
      throw new NotFoundException(`Department with ${departmentId} not found`);
    }
    return this.departmentRepository.save(department);
  }

  async remove(departmentId: number) {
    const department = await this.findOne(departmentId);
    return this.departmentRepository.remove(department);
  }
}
