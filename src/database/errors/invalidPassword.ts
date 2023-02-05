export class InvalidPassword extends Error {
  constructor() {
    super('Invalid password received');
    this.name = 'Invalid password';
  }
}
