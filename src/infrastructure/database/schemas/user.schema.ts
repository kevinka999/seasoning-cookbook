import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserData } from '../../../domain/entities/user.entity';

export type UserDocument = UserData & Document;

@Schema({ collection: 'users', timestamps: true })
export class UserSchema {
  @Prop({ required: true, unique: true })
  identityId: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
