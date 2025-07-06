export interface ErrorResponse {
  error: string;
}

export interface ResponseLocalAuth {
  token: string;
  decodedToken: {
    user_id: string;
    name: string;
    email: string;
  };
}
