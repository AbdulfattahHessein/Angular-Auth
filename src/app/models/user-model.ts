export interface UserModel {
  email: string;
  sub: string;
  unique_name: string;
  jti: string;
  roles: string | string[];
  exp: number;
  iss: string;
  aud: string;
}
