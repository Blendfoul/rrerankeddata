export type TwitchResponse = {
  data: TwitchProfile[];
};

export type TwitchProfile = {
  broadcaster_language: string;
  broadcaster_login: string;
  display_name: string;
  game_id: string;
  game_name: string;
  id: string;
  is_live: boolean;
  started_at: string;
  tag_ids: string[];
  thumbnail_url: string;
  title: string;
};
