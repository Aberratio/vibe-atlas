import { PlaylistItem } from "./PlaylistItem";

export interface PlaylistDetailsItem extends PlaylistItem {
  items: {
    track: FavoriteItem;
  }[];
}

export interface FavoriteItem {
  album: {
    images: {
      url: string;
    }[];
    name: string;
    album_type: string;
    external_urls: {
      spotify: string;
    };
  };
  duration_ms?: number;
  id: string;
  name: string;
  artists: {
    name: string;
    external_urls: {
      spotify: string;
    };
  }[];
  external_urls: {
    spotify: string;
  };
}
