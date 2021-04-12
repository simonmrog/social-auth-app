"use strict";

import UserModel from "../models/user.js";
import UserService from "./user.js";


class SocialAuthService {
  async loginUser(userProfile) {
    const user = await UserModel.findOne({ providerId: userProfile.id });
    if (user !== null) {
      console.log("User already exists");
      return user;
    }

    const newUser = await UserService.createUser(userProfile);
    console.log("User created");
    return newUser;
  }
}

export default new SocialAuthService();
