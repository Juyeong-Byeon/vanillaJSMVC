(function (exports) {
    function SpinboxView() {

    }
    SpinboxView.prototype = {
        render: function (value) {
            document.querySelector('.result').value = value;
        }
    }
    exports.SpinboxView = SpinboxView;
})(this);