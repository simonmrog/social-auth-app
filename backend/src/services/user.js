"use strict";

import UserModel from "../models/user.js";

class UserService {
  async createUser(userProfile) {
    const userModel = new UserModel({
      providerId: userProfile.id,
      provider: userProfile.provider,
      name: userProfile.displayName,
      photo: userProfile.photos[0].value
    });

    const newUser = await userModel.save();
    return newUser;
  }
}

export default new UserService();
