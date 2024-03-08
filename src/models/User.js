/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.password = null;
    this.username = null;
    this.id = null;
    this.status = null;
    Object.assign(this, data);
  }
}

export default User;
