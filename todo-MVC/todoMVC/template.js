(function (exports) {
    'use strict';
    function Template() {
        console.log("template created");
        this.defaultTemplate = (id, completed, checked, title) => {

            return (` <li data-id="${id}" class="${completed}">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${checked}>
                            <label>${title}</label>
                            <button class="destroy"><button>
                        </div>
                    </li>`);
        }

    }

    Template.prototype.inert = function (data) {
        console.log('Template.insert method executed');
        let view = '';
        return data.map(({ id, title, completed, checked }, index, arr) => {
            return this.defaultTemplate(id, completed, checked, title);
        }).join('');
    }

    exports.app = exports.app || {};
    exports.app.Template = Template;
})(this);