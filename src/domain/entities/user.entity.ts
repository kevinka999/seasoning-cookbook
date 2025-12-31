export interface UserData {
  id: string;
  email: string;
  googleId: string | null;
  googleProfilePicture?: string | null;
  passwordHash?: string | null;
  nickname: string;
  inGameNickname?: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date | null;
}

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly googleId: string | null;
  public readonly googleProfilePicture: string | null;
  public readonly passwordHash: string | null;
  public readonly nickname: string;
  public readonly inGameNickname: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly lastLoginAt: Date | null;

  constructor(data: UserData) {
    this.id = data.id;
    this.email = data.email;
    this.googleId = data.googleId;
    this.googleProfilePicture = data.googleProfilePicture ?? null;
    this.passwordHash = data.passwordHash ?? null;
    this.nickname = data.nickname;
    this.inGameNickname = data.inGameNickname ?? null;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.lastLoginAt = data.lastLoginAt ?? null;
  }
}
