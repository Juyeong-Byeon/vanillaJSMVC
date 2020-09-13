(function (exports) {
    function Controller(model, view) {
        console.log("Controller created");
        this.model = model;
        this.view = view;
        let self = this;
        this.view.bind('newTodo', function (title) {
            self.addItem(title);
        });
        this.view.bind('itemRemove', function (item) {
            self.removeItem(item.id);
        })
        this.view.bind('itemToggle', function (item) {
            console.log('Controller.prototype 에서 bind 호출 elementCompleted exe');
            self.toggleComplete(item.id, item.completed);
        })
        this.view.bind('itemEdit', function (item) {
            self.editItem(item.id);
        });
        this.view.bind('itemEditDone', function (item) {
            self.editItemSave(item.id);
        });
        this.view.bind('removeCompleted', function () {
            self.removeCompletedItems();
        })
        this.showAll();
    }

    Controller.prototype.showAll = function () {
        console.log('Controller.showAll method exe');
        let self = this;
        this.model.read(function (data) {
            self.view.render('showEntries', data);
        });
    }

    Controller.prototype.addItem = function (title) {
        console.log('Controller.addItem method exe');
        let self = this;
        if (title.trim() === '') {
            return;
        }
        self.model.create(title, function () {
            self.view.render('clearNewTodo', title);
        });
        this.showAll();
    }

    Controller.prototype.removeItem = function (id) {
        let self = this;
        self.model.remove(id, function () {
            self.view.render('removeItem', id);
        })
    }
    Controller.prototype.toggleComplete = function (id, completed) {
        console.log('controller.prototype.toggleComplete exe');
        let self = this;
        self.model.update(id, { completed: completed }, function () {
            self.view.render('elementComplete', {
                id: id,
                completed: completed
            })
        })
    }
    Controller.prototype.editItem = function (id) {
        console.log('controller.prototype.editItem exe');
        let self = this;
        self.model.read(id, function (data) {
            self.view.render('editItem', { id: id, title: data[0].title });
        })
    }
    Controller.prototype.editItemSave = function (id, title) {
        console.log("Controller.prototype.editItemSave exe");
        let self = this;
        title = title.trim();
        if (title.length !== 0) {
            self.model.update(id, { title: title }, function () {
                self.view.render('editItemDone', { id: id, title: title });
            })
        } else {
            self.removeItem(id);
        }
    }
    Controller.prototype = function () {
        console.log("Controller.prototype.removeCompletedItems exe");
        let self = this;
        self.model.read({ completed: true }, function (data) {
            data.forEach(function (item) {
                self.removeCompletedItems(item.id);
            })
        })
    }

    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);