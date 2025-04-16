import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
  } from "typeorm";
  import { User } from "../user/user.entity";


  @Entity({ name: "chats" })
  export class Chat {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @OneToOne(() => User, (user) => user.id)
    user!: User[];
  
    @Column({ nullable: false })
    status!: string;

    @Column({ nullable: false })
    message!: string;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedA!: Date;
  }