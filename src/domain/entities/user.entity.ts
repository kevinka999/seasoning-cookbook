export interface UserData {
  _id?: string;
  identityId: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  public readonly _id?: string;
  public readonly identityId: string;
  public readonly nickname: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: UserData) {
    this._id = data._id || '';
    this.identityId = data.identityId;
    this.nickname = data.nickname;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
