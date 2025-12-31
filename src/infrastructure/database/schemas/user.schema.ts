import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserData } from '../../../domain/entities/user.entity';

export type UserDocument = UserData & Document;

@Schema({ collection: 'users', timestamps: true })
export class UserSchema {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, unique: true, sparse: true, default: null })
  googleId: string | null;

  @Prop({ required: false, default: null })
  googleProfilePicture: string | null;

  @Prop({ required: false, default: null })
  passwordHash: string | null;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: false, default: null })
  inGameNickname: string | null;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: false, default: null })
  lastLoginAt: Date | null;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);

