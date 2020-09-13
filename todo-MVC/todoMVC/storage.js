(function (exports) {
    'use strict';
    function Storage(name, callback) {
        console.log('store cerated');
        callback = callback || function () { };
        this._dbName = name;
        if (!localStorage[name]) {
            let data = {
                todos: []
            };
            localStorage[name] = JSON.stringify(data);
        }
    }

    Storage.prototype.findAll = function (callback) {
        console.log('Storage.findAll method exe');
        callback = callback || function () { };
        callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
    }

    Storage.prototype.save = function (updateData, callback, id) {
        console.log('Storage.save method exe');
        let data = JSON.parse(localStorage[this._dbName]);
        let todos = data.todos;
        callback = callback || function () { };

        if (id) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    for (let key in updateData) {
                        todo[i][key] = updateData[key];
                    }
                    break;
                }
            }

        } else {
            updateData.id = new Date().getTime();
            todos.push(updateData);
            localStorage[this._dbName] = JSON.stringify(data);
            callback.call(this, [updateData]);
        }

    }
    Storage.prototype.remove = function (id, callback) {
        let data = JSON.parse(localStorage[this._dbName]);
        let todos = data.todos;
        todos.filter((todo, index, arr) => {
            return !todo.id === id;
        });
        localStorage[this._dbName] = JSON.stringify(data);
        callback.call(this, todos);
    }
    Storage.prototype.find = function (query, callback) {
        if (!callback) {
            return;
        }
        let todos = JSON.parse(localStorage[this.dbName]).todos;
        callback.call(this, todos.filter(function (todo) {
            for (let q in query) {
                if (query[q] !== todo[q]) {
                    return false;
                }
            }
            return true;
        }));
    }
    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);