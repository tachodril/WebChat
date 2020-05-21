const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);
  console.log("25", users);

  return { user };
};

const removeUser = (id) => {
  const index = users.find((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  console.log("1", id);
  console.log(users);

  const temp = users.find((user) => user.id === id);
  console.log(temp);
  return temp;
};

const getUsersInRoom = (room) => {
  const temp = users.filter((user) => user.room === room);
  return temp;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
