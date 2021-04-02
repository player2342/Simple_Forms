// All of the animations that I've used here are made with AnimeJS library
// This library has great interactive documentation of "How To" - https://animejs.com/documentation/
// Link on the Github Repo: https://github.com/juliangarnier/anime/
// To use this library with NodeJs do this:
// 1. Download: npm install animejs --save
// 2. Usage:
// 2.1. ES6 modules: import anime from 'animejs/lib/anime.es.js';
// 2.2. CommonJS: const anime = require('animejs');
// 2.3. File include (Link anime.min.js in your HTML):  <script src="anime.min.js"></script>


const inputContainers = document.querySelectorAll('.main--form-input--container');
const form = document.querySelector('.main--form');
const btnTryAgain = document.querySelector('.congrats BUTTON');
let formTranslateY = 0;

inputContainers.forEach(item => {
    const input = item.querySelector('.main--form-input');
    input.addEventListener('keyup', event => {
        
        if (event.keyCode === 13 && event.target.value != '' && event.target.value != ' ' && event.target.value != null) {
        // When user presses the "ENTER" key this part of code will be executed 

            // This "anime" function animates each container with input and label (each container has class ".main--form-input--container") to fade them to left 
            anime({
                targets: item,
                translateX: -2500,
                duration: 500,
                delay: 0,
                easing: 'linear',
                // when animation is completed then call the function
                complete: function() {
                    // This function animates each container with input and label (each container has class ".main--form-input--container") to fade them to back to the center
                    // So when you click the "Try again" button all of the input containers are visible
                    anime({
                        targets: item,
                        translateX: 0,
                        duration: 500,
                        easing: 'linear',
                    })
                },
            })
            // This "anime" function animates the entire "FORM" container with class ".main--form" and translates that on 33% of its height to top
            anime({
                targets: form,
                translateY: function() {
                    // This function actually translates the form container to top
                    // And because there are 3 containers with input and label inside the form and each container shoud be centered on the display you should use 33% value
                    // If there will be 4 containers with input and label inside the form then you should use 25%, if 5 then 20% and so on
                    formTranslateY -= (+33);
                    return formTranslateY + '%';
                },
                delay: 500,
                duration: 500,
                easing: 'easeInOutBack',
                complete: function () {
                    // If user is completed all of the inputs in the form the show the "congrats" block
                    if (formTranslateY < -90) {
                        document.querySelector('.congrats').style.display = 'flex'
                    }
                }
            })
        } else if (event.keyCode !== 13) {
            // If another key was pressed the do nothing, because we have to listen only on "ENTER" press
        } else {
            // If user leaves the input form empty then show an error message
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
        // After clicking this button form translates back to 0 vertically
        anime({
            targets: form,
            translateY: function() {
                formTranslateY = 0;
                return formTranslateY + '%';
            },
            easing: 'easeInOutBack',
            duration: 2000,
            begin: function () {
                // This animation changes opacity of "congrats" block from 1 to 0
                // And when animation is completed set "style.display" to none
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