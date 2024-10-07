interface IUserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  photoUrl: string;
  createdAt: Date;
  type: string;
}

export type { IUserModel };
