import {GenericProfile} from './genericProfile';

export interface FriendsProfile extends GenericProfile {
  contacts: {
    active: Friend[];
  };
}

export interface Friend {
  avatar_full: string;
  avatar: string;
  name: string;
  user_id: number;
  path: string;
  id: string;
}
