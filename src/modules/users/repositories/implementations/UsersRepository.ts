import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, { name, email });

    this.users.push(newUser);
    return newUser;
  }

  findById(id: string): User | undefined {
    // eslint-disable-next-line prettier/prettier
    return this.users.find(user => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    // eslint-disable-next-line prettier/prettier
    return this.users.find(user => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const filteredUsers = this.users.filter(
      // eslint-disable-next-line prettier/prettier
      user => user.id !== receivedUser.id
    );

    const updatedUser = new User();
    Object.assign(updatedUser, {
      id: receivedUser.id,
      name: receivedUser.name,
      email: receivedUser.email,
      admin: true,
      created_at: receivedUser.created_at,
    });

    filteredUsers.push(updatedUser);
    this.users = filteredUsers;
    return updatedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
