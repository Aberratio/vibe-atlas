export interface PlaylistItem {
  id: string;
  name: string;
  owner: {
    display_name: string;
  };
  description?: string;
  external_urls: {
    spotify: string;
  };
  images?: {
    url: string;
  }[];
  tracks: {
    href: string;
    total: number;
  };
}
