var todos = new Map();

module.exports = {
  getTodos: function () {
    var todosList = [];
    todos.forEach((value, key) => {
      todosList.push({ text: key, done: value });
    });
    return todosList;
  },

  createTodo: function (todo_text, todo_status) {
    todos.set(todo_text, todo_status);
    return { text: todo_text, done: todo_status };
  },
};
