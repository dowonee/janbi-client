export interface UserProfile {
  _id: string;
  name: string;
  email: string;
}

export interface UserProfileResponse {
  user: UserProfile;
}
