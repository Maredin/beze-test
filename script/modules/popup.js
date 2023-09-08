
// Функция Попап с таймером. Если таймер false, то таймер не работает
function popup(modal, btnModal, timer) {
    const popup = document.querySelector(modal), //Сам блок попап
        btn = document.querySelector(btnModal); // Кнопка закрытия

    // Вешаем обработчик на кнопку, чтоб показать модалку    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Вешаем обработчик на модальное окно, чтоб скрыть модалку по клику  
    popup.addEventListener('click', (e) => {
        if(e.target.classList.contains('poppup__close') ||  e.target.classList.contains('poppup')) {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    //Таймер открытия модалки в мс
    if(timer > 0) {
        setTimeout((timer)=> {
            popup.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, timer)
    }
}

/* popup('.poppup', '.btn', false);
popup('.poppup', '.btn__first', 2000); */

export default popup;