import { Nullable } from "../../type";

export type Organization = {
  name: string;
  uid: string;
  id: string;
  create_time: string;
  update_time: string;
  org_name: string;
  customer_id: string;
  profile_avatar: Nullable<string>;
  profile_data: {
    organization_type: Nullable<string>;
    homepage: Nullable<string>;
    twitter_username: Nullable<string>;
    github_username: Nullable<string>;
    organization_bio: Nullable<string>;
  };
};
