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

  @Prop({
    required: false,
    unique: true,
    sparse: true,
    default: null,
    type: String,
  })
  googleId: string | null;

  @Prop({ required: false, default: null, type: String })
  googleProfilePicture: string | null;

  @Prop({ required: false, default: null, type: String })
  passwordHash: string | null;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: false, default: null, type: String })
  inGameNickname: string | null;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: false, default: null, type: Date })
  lastLoginAt: Date | null;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
