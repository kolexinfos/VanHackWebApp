export class RegisterModel {
  public firstname : string;
  public lastname : string;
  public email: string;
  public password: string;
  public phone: string;
  public username: string;
  public isActive: boolean;

  constructor(firstname:string,lastname:string, phone: string, email: string, password: string, username : string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}