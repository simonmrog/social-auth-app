"use strict";

class AuthService {
  createToken(auth) {
    return jwt.sign({
      id: auth.id
    }, "my-secret", {
      expiresIn: 60 * 120
    });
  }
}
