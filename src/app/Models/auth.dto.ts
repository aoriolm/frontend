export class AuthDTO {
  id: string;
  accessToken: string;
  email: string;
  password: string;

  constructor(
    id: string,
    accessToken: string,
    email: string,
    password: string
  ) {
    this.id = id;
    this.accessToken = accessToken;
    this.email = email;
    this.password = password;
  }
}
