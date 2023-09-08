
function clickInput() {
    const div = document.querySelector('.file__add-btn');
    div.addEventListener('click', () => {
        document.querySelector('.file__add-input').click();
    });
}

export default clickInput;