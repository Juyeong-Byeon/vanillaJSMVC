function TodoController() {
    this.TodoModel = new TodoModel();
    this.TodoView = new TodoView(this.removeListener);
    this.TodoInput = document.querySelector('.todo-input');
    this.TodoCounter = 0;

    const TodoAddBtn = document.querySelector('.btn-add');
    TodoAddBtn.addEventListener('click', (e) => {
        this.addBtnListener();
    })
}

TodoController.prototype = {
    addBtnListener: function () {
        const todo = {
            id: this.TodoCounter++,
            todo: this.TodoInput.value
        };
        this.TodoModel.addTodo(todo);
        console.log(this.TodoModel.getTodos());
        this.TodoInput.value = '';
        this.TodoView.render(this.TodoModel.getTodos());
    },
    removeListener: function (e) {
        const id = e.target.value;
        this.TodoModel.removeTodo(id);
        this.TodoView.render(this.TodoModel.getTodos());
    }
}
