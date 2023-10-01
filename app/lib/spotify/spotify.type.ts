export type UserProfile = {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: any[];
  type: string;
  uri: string;
  followers: { href: null | string; total: number };
  email: string;
};
