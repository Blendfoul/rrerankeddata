export interface UserInfo {
  username: string;
  vip: boolean;
  name: string;
  team: string;
  country: {
    code: string;
    name: string;
  };
  developer: boolean;
  id: number;
  avatar: string;
}
