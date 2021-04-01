const inputContainers = document.querySelectorAll('.main--form-input--container');
const form = document.querySelector('.main--form');
const btnTryAgain = document.querySelector('.congrats BUTTON');
let formTranslateY = 0;

inputContainers.forEach(item => {
    const input = item.querySelector('.main--form-input');
    input.addEventListener('keyup', event => {
        if (event.keyCode === 13 && event.target.value != '' && event.target.value != ' ' && event.target.value != null) {
            anime({
                targets: item,
                translateX: -2500,
                duration: 500,
                delay: 0,
                easing: 'linear',
                complete: function() {
                    anime({
                        targets: item,
                        translateX: 0,
                        duration: 500,
                        easing: 'linear',
                    })
                },
            })
            anime({
                targets: form,
                translateY: function() {
                    formTranslateY -= (+33);
                    return formTranslateY + '%';
                },
                delay: 500,
                duration: 500,
                easing: 'easeInOutBack',
                complete: function () {
                    if (formTranslateY < -90) {
                        document.querySelector('.congrats').style.display = 'flex'
                    }
                }
            })
        } else if (event.keyCode !== 13) {
            //do nothing
        } else {
            let placeholder = event.target.placeholder;
            event.target.classList.add('err');
            event.target.placeholder = 'Type something in this field!';
            setTimeout(() => {
                event.target.classList.remove('err');
                event.target.placeholder = placeholder;
            }, 2000)
        }
    })

    btnTryAgain.addEventListener('click', () => {
        anime({
            targets: form,
            translateY: function() {
                formTranslateY = 0;
                return formTranslateY + '%';
            },
            easing: 'easeInOutBack',
            duration: 2000,
            begin: function () {
                anime({
                    targets: document.querySelector('.congrats'),
                    opacity: [1, 0],
                    duration: 400,
                    easing: 'linear',
                    complete: function() {
                        document.querySelector('.congrats').style.display = 'none'
                    }
                })
            }
        })
    });
})