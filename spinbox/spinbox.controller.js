
function SpinboxController() {
    this.SpinboxModel = new SpinboxModel(100);
    this.SpinboxView = new SpinboxView();

    this.SpinboxView.render(this.SpinboxModel.getData());

    const increaseBtn = document.querySelector('.btn-increase');
    const decreaseBtn = document.querySelector('.btn-decrease');

    increaseBtn.addEventListener('click', () => {

        this.onClickIncrease();

    });
    decreaseBtn.addEventListener('click', () => {
        this.onClickDecrease();
    });

}

SpinboxController.prototype = {
    onClickIncrease: function () {
        this.SpinboxModel.increase();
        this.SpinboxView.render(this.SpinboxModel.getData());
    },
    onClickDecrease: function () {
        this.SpinboxModel.decrease();
        this.SpinboxView.render(this.SpinboxModel.getData());
    }
}
