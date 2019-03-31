export default class {
    constructor () {
        this.callers = document.querySelectorAll('[data-popup-target]');
        this.popups = new Array();

        if ( this.callers.length ) {
            this.init();
        }
    }

    init () {
        const { callers, popups } = this,
        popupOverlay = new Overlay();

        // За каждый тригер создается попал
        Array.prototype.forEach.call( callers, caller => {
            //Ищет елементы с айдишниками
            const target = caller.dataset.popupTarget;
            let popup = document.querySelector(target);


            if ( popup ) {
                //Создает попап
                popup = new Popup(popup, popupOverlay, popups)
                // Добавляется в список попапов
                popups.push(popup);

                // хендлер открытия
                caller.addEventListener( 'click', () => {
                    event.preventDefault();
                    popup.open();
                })

                // хендлер закрытия по оверлею
                popupOverlay.overlay.addEventListener( 'click', () => popup.close() )

                // хендлер закрытия по эскейпу
                document.addEventListener( 'keydown', e => { if (e.keyCode === 27) popup.close() })

                // хендлер закрытия по крестику
                const closeButton = document.querySelector('[data-popup-close="all"]');

                if (closeButton) closeButton.addEventListener( 'click', () => popup.closeAllPopups() )

            } else {
                console.error(`not find popup ${caller.dataset.popupTarget} in popup-caller`, caller);
            }
        })
    }
}

class Overlay {
    // Один оверлей на все попапы
    constructor () {
        this.overlay = document.createElement('div');
        this.overlay.className = 'popup-overlay';
        document.body.appendChild(this.overlay);
    }

    close () {
        const { overlay } = this;

        overlay.classList.remove('popup-overlay--open');

        setTimeout( () => overlay.style.display = 'none', 500 )

    }

    open () {
        const { overlay } = this;

        overlay.style.display = 'block';

        setTimeout( () => overlay.classList.add('popup-overlay--open'), 0 )
    }

}

class Popup {
    constructor ( element, overlay, popups ) {
        this.element = element;
        this.overlay = overlay;
        this.popups = popups;
    }

    open () {
        const { element, overlay } = this;

        this.closeAllPopups(this);

        element.style.display = 'block';

        setTimeout( () => element.classList.add('popup--open'), 0)

        overlay.open();
    }

    close ( closeOverlay = true ) {
        const { element, overlay } = this;

        element.classList.remove('popup--open');

        setTimeout( () => element.style.display = 'none', 500 )

        if (closeOverlay) overlay.close();
    }

    closeAllPopups ( exeptPopup ) {
        const { popups } = this;

        //Закрытие всех попапов в списке, кроме переданного в скопе
        // Array.prototype.forEach.call( popups, popup => { if (popup.element !== exeptPopup.element) popup.close(false) } )
        Array.prototype.forEach.call( popups, popup => {
            if (exeptPopup) {
                if (popup.element !== exeptPopup.element) popup.close(false)
            } else {
                popup.close()
            }
        })

    }

}