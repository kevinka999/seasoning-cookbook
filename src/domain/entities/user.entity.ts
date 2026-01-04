export interface UserData {
  id: string;
  identityId: string;
  nickname: string;
  inGameNickname?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  public readonly id: string;
  public readonly identityId: string;
  public readonly nickname: string;
  public readonly inGameNickname: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: UserData) {
    this.id = data.id;
    this.identityId = data.identityId;
    this.nickname = data.nickname;
    this.inGameNickname = data.inGameNickname ?? null;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
