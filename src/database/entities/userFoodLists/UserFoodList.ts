import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/User';
import { Food } from '../foods/Food';

@Entity()
export class UserFoodList {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Many UserFoodList entries belong to one User
  @ManyToOne(() => User, (user) => user.userFoodsList, { onDelete: 'CASCADE' })
  user!: User;

  // Many UserFoodList entries belong to one Food
  @ManyToOne(() => Food, (food) => food.userFoodsList, { onDelete: 'CASCADE' })
  food!: Food;
}
