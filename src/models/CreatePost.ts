interface IPostModel {
  id: string;
  title: string;
  body: string;
  artistId: string;
  like_count: number;
  comment_count: number;
  createdAt: string;
  updatedAt: string;
}

export type { IPostModel };
