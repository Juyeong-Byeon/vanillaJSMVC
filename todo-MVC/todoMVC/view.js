(function (exports) {
    function View(template) {
        console.log('view created!');
        this.template = template;

        this.$todoList = document.querySelector('.todo-list');
        this.$newTodo = document.querySelector('.new-todo');
    }
    View.prototype.bind = function (event, handler) {
        let self = this;
        let todo = self.$todoList;
        if (event === 'newTodo') {
            console.log('View.bind.newTodo exe');
            let input = self.$newTodo;
            input.addEventListener('change', function () {
                handler(self.$newTodo.value);
            })
        } else if (event === 'itemRemove') {
            todo.addEventListener('click', function (event) {
                let target = event.target;
                if (target.className === 'destroy') {
                    handler({ id: self._getItemId(target.parentNode, "li") });
                }
            });
        } else if (event === 'itemToggle') {
            console.log('view.prototype.bind.itemToggle execute');
            todo.addEventListener('click', function (event) {
                let target = event.target;
                if (target.className === 'toggle') {
                    handler({ id: self._getItemId(target), completed: target.checked });
                }
            });
        } else if (event === 'itemEdit') {
            console.log("View.prototype.bind.itemEdit executed");
            todo.addEventListener('dbclick', function (event) {
                let target = event.target;
                if (target.tagName.toLowerCase() === 'label') {
                    handler({ id: self._getItemId(target) });
                }
            });
        } else if (event === 'itemEditDone') {
            todo.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    var target = event.target;
                    handler({ id: self._getItemId(target), title: target.value });
                }
            })
        } else if (event === 'removeCompleted') {
            console.log('view.prototype.bind.removecompleted exe');
            self.$clearCompleted.addEventListener('click', function () {
                handler();
            })
        }
    }

    View.prototype.render = function (viewCmd, data) {
        let self = this;
        let viewCommands = {
            showEntries: function () {
                console.log('View.render.showEntries exe');
                self._addItem(parameter);
            },
            clearNewTodo: function () {
                console.log("View.render.clearNewTodo exe");
                self.$newTodo.value = '';
            },
            removeItem: function () {
                self._removeItem(parameter);
            },
            editItem: function () {
                console.log('View.prototype.render.editItem exe');
                self._editItem(parameter.id, parameter.title);
            },
            editItemDone: function () {
                console.log("View.prototype.render.editItemDone exe");
                self._editItemDone(parameter.id, parameter.title);
            }
        };
        viewCommands[viewCmd]();
    }
    View.prototype._addItem = function (id) {
        this.$todoList.innerHTML = this.template.insert(id);
    }
    View.prototype._getItemId = function (element, tagName) {
        let li;
        if (tagName) {
            if (element.parentNode.tagName.toLowerCase() === target.toLowerCase()) {
                li = element.parentNode;
            }
        } else {
            li = element.parentNode.parentNode;
        }
        return parseInt(li.dataset.id, 10);
    }
    View.prototype._removeItem = function (id) {
        let elem = document.querySelector(`[data-id="${id}"]`);
        if (elem) {
            this.$todoList.removeChild(elem);
        }
    }
    View.prototype._elementComplete = function (id, completed) {
        console.log('View.prototype.render._elementComplete exe');
        let listItem = document.querySelector(`[data-id="${id}"]`);
        if (listItem) {
            listItem.className = completed ? 'completed' : "";
        }
    }
    View.prototype._itemId = function (element) {
        let li = element.parentNode;
        console.log('return value=' + li.dataset.id);
        return parseInt(li.dataset.id, 10);
    }
    View.prototype._editItem = function (id, title) {
        console.log('View.prototype._editItem exe');
        let listItem = document.querySelector(`[data-id="${id}"]`);

        if (listItem) {
            listItem.className = listItem.className + 'editing';

            let input = document.createElement('input');
            input.className = 'edit';

            listItem.appendChild(input);
            input.focus();
            input.value = title;
        }
    }
    View.prototype._editItemDone = function (id, title) {
        console.log('View.prototype._editItemDone exe');
        let listItem = document.querySelector(`[data-id="${id}"]`);

        if (listItem) {
            let input = document.querySelector('input.edit', listItem);
            listItem.removeChild(input);
            listItem.className = listItem.className.replace('editing', '');

            let label = document.querySelectorAll('label');
            label.forEach((L) => {
                if (L.parentNode.parentNode === listItem) {
                    label.textContent = title;
                }
            });
        }
    }

    exports.app = exports.app || {};
    exports.app.View = View;
})(this);