export class User {
  id: number;
  username: String;
  password: String;
  email: String;
  loginName: String;
  firstName: String;
  lastName: String;
  about: String;
  hobbies: String;
  phone: number;
  image: { filetype: any; filename: any; value: string };
  imageCouverture: { filetype: any; filename: any; value: string };
  facebookLink: String;
  twitterLink: String;
  createdAt: Date;
  token?: String;
}
