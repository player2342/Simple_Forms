const inputContainers = document.querySelectorAll('.main--form-input--container');


inputContainers.forEach(item => {
    const input = item.querySelector('.main--form-input');
    
    input.addEventListener('keyup', event => {
        if (event.keyCode === 13 && event.target.value != '' && event.target.value != ' ' && event.target.value != null) {
            anime({
                targets: item,
                translateY: -1000,
                duration: 4000
            })
        } else if (event.keyCode !== 13) {
            //do nothing
        } else {
            event.target.value = 'Type something in this field!';
            event.target.style.color = 'red';
            setTimeout(() => {
                event.target.value = '';
            event.target.style.color = 'black';
            }, 2000)
        }
    })
})