(function (exports) {
    'use strict';
    function Model(storage) {
        console.log('Model created');
        this.storage = storage;
    }

    Model.prototype.cerate = function (title, callback) {
        console.log("Model.create method exe");
        title = title || "";
        callback = callback || function () { }
        let newItem = {
            title: title.trim(),
            completed: false
        };
        this.storage.save(newItem, callback);
    }
    Model.prototype.remove = function (id, callback) {
        this.storage.remove(id, callback);
    }
    Model.prototype.update = function (id, data, callback) {
        console.log('Model.prototype.update exe');
        this.storage.save(data, callback, id);
    }
    Model.prototype.read = function (query, callback) {
        let queryType = typeof query;
        callback = callback || function () { };

        if (queryType === 'function') {
            callback = query;
            return this.storage.findAll(callback);
        } else if (queryType === 'string' || queryType === "number") {
            query.storage.find({ id: query }, callback);
            this.storage.find({ id: query }, callback);
        } else {
            this.storage.find(query, callback);
        }
    }
    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);