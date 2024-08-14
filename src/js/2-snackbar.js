import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(`.form`);
const delayInput = document.querySelector('input[name="delay"]');

form.addEventListener(`submit`, event => {
    event.preventDefault();
    let delay = Number(delayInput.value);

    const stateValue = form.querySelector('input[name="state"]:checked').value;

    const promise = new Promise ((resolve, reject) => {
        setTimeout(() => {

            if ('fulfilled' === stateValue) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })


    promise
       .then(delay => {
           iziToast.show({
               message: `Fulfilled promise in ${delay}ms`,

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
       .catch(delay => {
           iziToast.show({
              message: `Rejected promise in ${delay}ms`,
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



