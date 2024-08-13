import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(`.form`);
const delayInput = document.querySelector('input[name="delay"]');
const button = document.querySelector(`button[type="submit"]`);
const checkBox = document.querySelector('input[name="state"]:checked');

form.addEventListener(`submit`, event => {
    event.preventDefault();
    let delay = Number(delayInput.value);

    const state = form.querySelector('input[name="state"]:checked');

    const promise = new Promise ((resolve, reject) => {
        setTimeout(() => {

            if ('fulfilled' === event.target.state.value) {
                resolve(`Fulfilled promise in ${delay}ms`);
            } else {
                reject(`Rejected promise in ${delay}ms`);
            }
        }, delay);
    })


    promise
       .then(message => {
           iziToast.show({
               message: message,

               position: 'topRight',
               maxWidth: 383,
               backgroundColor: '#59a10d',

               messageColor: '#fff',
               messageSize: '16px',
               messageLineHeight: '150%',

               title: 'OK',
               titleColor: '#fff',
               titleSize: '16px',
               titleLineHeight: '150%',

               iconUrl: `../img/icon-sucssesful.svg`,

           });
        })
       .catch(error => {
           iziToast.show({
              message: error,
              position: 'topRight',
              maxWidth: 383,
              backgroundColor: '#ef4040',

              messageColor: '#fff',
              messageSize: '16px',
              messageLineHeight: '150%',

              title: 'Error',
              titleColor: '#fff',
              titleSize: '16px',
              titleLineHeight: '150%',

              iconUrl: `../img/icon-error.svg`,

              iconColor: '#fff',
           });
        })
})



