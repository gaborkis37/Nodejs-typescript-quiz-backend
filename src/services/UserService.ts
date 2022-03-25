import { IUser, User } from "../models/User";

class UserService {
  async createUser(username: string) {
    try {
      const currUser = await User.findOne({ username });
      console.log(currUser);
      if (!currUser) {
        const user: IUser = new User({ username });
        return await user.save();
      } else {
        return currUser;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers() {
    return User.find();
  }

  async addScoreToUser(userId: string, score: number) {
    const user = await User.findById(userId);

    if (!user) {
      throw Error("User not found");
    }

    user.recentScore = score;
    user.allTimeScore = user.allTimeScore + score;
    return user.save();
  }
}

export default new UserService();
