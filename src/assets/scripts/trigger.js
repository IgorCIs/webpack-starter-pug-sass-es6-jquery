
const Trigger = () => {
    const triggers = document.querySelectorAll('[data-trigger-target]');
    
    [...triggers].forEach(trigger => new TriggerItem(trigger))
}

class TriggerItem {
    constructor(element) {
        this.element = element;
        this.event = element.dataset.triggerEvent || 'click';

        this.target = element.dataset.triggerTarget;
        this.targetElements = document.querySelectorAll(`[data-trigger-self="${this.target}"]`);

        if (!this.target) this.targetElements = [element];

        this.triggerTargets();
    }

    triggerTargets() {
        const { targetElements, event, element } = this;

        //Если неправильно указано событие - ошибка
        try {
            element.addEventListener(event, () => {
                [...targetElements].forEach(el => {
                    const actClass = el.dataset.triggerClass || 'active';
                    [...actClass.split(' ')].forEach(cl => 
                        el.classList.toggle(cl)
                    )
                })
            })
        } catch (e) {
            console.error("Wrong event at" + element);
        }
    }
}

export default Trigger