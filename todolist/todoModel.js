(function (exports) {
    function TodoModel() {
        this.todos = [];
    }
    TodoModel.prototype = {

        getTodos: function () {
            return this.todos;
        },
        addTodo: function (todo) {
            this.todos.push(todo);
        },
        removeTodo: function (id) {
            this.todos.filter((value, index, arr) => {
                return value.id !== id;
            });
        }
    }
    exports.TodoModel = TodoModel;
})(this);

