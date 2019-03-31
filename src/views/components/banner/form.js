import mask from './../../../../node_modules/imaskjs/dist/imask'

export default () => {
  const forms = document.querySelectorAll('form');
  [...forms].forEach(form => new Form(form))
}

class Form {
    constructor(form) {
        this.sended = false
        this.form = form
        this.button = this.form.querySelector('.button')
        this.inputs = this.form.querySelectorAll('input')
        this.regs = {
            email: text => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(text),
            tel: text => text.length > 16,
            name: text => text.length > 1,
        }

        this.form && this.init()

    }

    init() {
        const { button } = this

        new IMask(
            document.querySelector('input[type="tel"]'), {
                mask: '+{38}(000)000-00-00'
        })
        
        button.addEventListener('click', (e) => this.sendMessage(e))
    }

    sendMessage(e) {
        e.preventDefault()
        if (this.checkFields()) {  
            this.sending()        
            $.ajax({
                url: './../../message.php',
                type: 'post',
                data: this.serialize(),
                success: res => this.success(res),
                error: () => this.error()
            })
        }
    }

    checkFields() {
        const { inputs, regs } = this;
        [...inputs].forEach(input => input.classList.remove('fail'))        
        
        let res = true;
        [...inputs].forEach(input => {
            if(regs[input.name](input.value) === false) {
                input.classList.add('fail')
                res = false;
            } else {
                input.classList.add('nice')
            }
        })

        return res
    }

    serialize() {
        const { inputs } = this;

        return [...inputs].map(input => `${input.name}=${encodeURIComponent(input.value)}`).join("&")        
    }

    error() {
        const { form } = this;
        form.classList.add('error')
    }

    sending() {
        const { form } = this;
        form.classList.add('wait')   
    }

    success(res) {
        const { form, button } = this;

        button.disabled = true
        form.classList.add('sended')
    }
}