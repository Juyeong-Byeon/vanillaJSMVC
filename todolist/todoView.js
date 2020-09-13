(function (exports) {
    function TodoView(removeListener) {

        this.todoList = document.querySelector('.todo-list');
        this.todoList.addEventListener('click', (e) => {
            removeListener(e);
        })
    }
    TodoView.prototype = {
        render: function (todos) {
            this.todoList.innerHTML = todos.map(({ id, todo }, index, arr) => {
                return `<li class='todo-item'>${todo}<button id='${id}'>done</button></li>`;
            }).join('');

        }
    }
    exports.TodoView = TodoView;
})(this);