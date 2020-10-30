interface Message {
  msg: string;
  date: Date;
}
type Messages = Array<Message>;

interface User {
  user: string;
}
type Users = Array<User>;

const message: Messages = [];
const users: Users = [];

export { message, users };
