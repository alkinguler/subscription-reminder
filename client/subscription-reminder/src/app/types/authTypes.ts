export interface SignInResponse {
  username: string;
  accessToken: string;
}

export interface SignInErrorResponse {
  response: { data: { error?: string } };
}

export interface AuthFormInput {
  username: string;
  password: string;
}
