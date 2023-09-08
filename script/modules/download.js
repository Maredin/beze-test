function download() {
    let inputFile = document.querySelector('.file__add-input');
    let wrapper = document.querySelector('.file__add-wrapper');
    let dropZone = document.querySelector('.drop__zone');
    let saveBtn = document.querySelector('.form__btn-save');

    const corpAddBtn = document.querySelector('.organization__add-btn');
    
    //Скрываем показываем нужные блоки
    corpAddBtn.addEventListener('click', () => {
        hide('.corp__add');
        show('.corp__edit');
    });

    const corpCancleBtn = document.querySelector('.organization__cancel-btn');
    corpCancleBtn.addEventListener('click', () => {
        hide('.corp__edit');
        show('.corp__add');
    });

   

    inputFile.addEventListener('change', (e) => {
        addImg(e, false);
    });

    // Функция чтения инпут файла + создание img блока
    function addImg(e, dargDrop) {
        // сохраним в переменную files значение свойства files
        const files = (!dargDrop) ? e.target.files : e.dataTransfer.files;  
        /* const files = e.target.files; */
        const file = files[0];
        // длинна масива
        const countFiles = files.length;
        // если количество выбранных файлов больше 0
        if (countFiles) {         
            dropZone.style.display = 'none';          
        }

        // Создаем читалку
        let reader = new FileReader();
        reader.readAsDataURL(file);

        // Создаем новый элемент img и помещаем в обертку
        reader.onload = function () {
            let img = document.createElement('img');
            img.alt = 'logo';
            img.classList.add('file__add-logo')
            wrapper.appendChild(img);
            img.src = reader.result;
        }

    }

    // ДрагенДроп событие затаскиваем в зону
    dropZone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        dropZone.classList.add('drop__zone-active');
        hide('.drop__zone-title');
        hide('.drop__zone-descr');
        hide('.file__add-btn');
    });

    // ДрагенДроп событие убираем из зоны
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drop__zone-active');
        show('.drop__zone-title');
        show('.drop__zone-descr');
        show('.file__add-btn');
    });

    //Без этой херни ничего не работает
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    //Событие при отпускании файла в зоне, читаем элемент, создаем блок img
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();       
        addImg(e, true);
    });



    // Обработчик на кнопку + маска
    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let corpType = document.querySelector('#type').value;
        let corp = document.querySelector('#corp').value;
        let error = document.querySelector('.file__add-error');
        let img = document.querySelector('.file__add-logo');
        if(corpType && corp && img) {
            error.style.display = 'none';
            hide('.corp__edit');
            saveForm();
        }else{
            error.style.display = 'block';
        }
        
    })

    // Сохранить форму и вывести в новом блоке с данными
    function saveForm() {
        let corpType = document.querySelector('#type').value;
        let corp = document.querySelector('#corp').value;
        let descr = document.querySelector('#descr').value;
        let img = document.querySelector('.file__add-logo');

        let div = document.createElement('sections');
        div.classList.add('organization', 'corp__save', 'center');
        div.innerHTML = `
        <div class="organization__header">
            <h2 class="organization__header-title">Организация</h2>

            <div class="organization__edit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5.38626 11.5322C5.19852 11.7212 4.94311 11.8276 4.67669 11.8276H3C2.72386 11.8276 2.5 11.6037 2.5 11.3276V9.62927C2.5 9.36526 2.6044 9.11197 2.79043 8.92463L9.48806 2.18018C9.60266 2.06481 9.75807 2 9.92011 2C10.0822 2 10.2376 2.06481 10.3522 2.18018L12.081 3.92048C12.1956 4.03589 12.2599 4.19238 12.2599 4.35556C12.2599 4.51874 12.1956 4.67524 12.081 4.79064L5.38626 11.5322ZM2.5 13.3846C2.5 13.0447 2.77552 12.7692 3.11539 12.7692H12.8846C13.2245 12.7692 13.5 13.0447 13.5 13.3846C13.5 13.7245 13.2245 14 12.8846 14H3.11538C2.77552 14 2.5 13.7245 2.5 13.3846Z" fill="#353535"/>
                </svg>

                    <p>Редактировать</p>
            </div>
        </div>

        <div class="formSave">
            <div class="formSave__lable">Тип</div>
            <div class="formSave__select">${corpType}</div>

            <div class="formSave__lable">Название организации</div>
            <div class="formSave__select">${corp}</div>

            <div class="formSave__lable">Описание</div>
            <div class="formSave__select">${descr}</div>

            <div class="formSave__select">Логотип</div>

            <div class="file__add-wrapper">
                <img alt="logo" class="file__add-logo" src=${img.src}>
            </div>
        </div>
        `
        document.body.append(div);

        const corpEditBtn = document.querySelector('.organization__edit-btn');
        corpEditBtn.addEventListener('click', () => {
            let corpSave = document.querySelector('.corp__save ');
            show('.corp__edit');
            corpCancleBtn.remove();
            corpSave.remove();
        });
    }

    // Скрывает блок
    function hide(wrapperHide) {
        let wrapper = document.querySelector(wrapperHide);
        wrapper.style.display = 'none';
    }

    //Показывает блок
    function show(wrapperShow) {
        let wrapper = document.querySelector(wrapperShow);
        wrapper.style.display = 'flex';
    }
}


export default download;