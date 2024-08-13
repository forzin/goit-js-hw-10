import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const buttonStart = document.querySelector(`button[data-start]`);
const inputDate = document.querySelector(`input#datetime-picker`);
const dataDays = document.querySelector(`span[data-days]`);
const dataHours = document.querySelector(`span[data-hours]`);
const dataMinutes = document.querySelector(`span[data-minutes]`);
const dataSeconds = document.querySelector(`span[data-seconds]`);
const daysTime = document.querySelector(`.flatpickr-weekday`);




const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onReady(selectedDates, dateStr, instance) {
        setTimeout(() => {
            const dayHeaders = instance.calendarContainer.querySelectorAll('.flatpickr-weekday');

            dayHeaders.forEach((header) => {
                let text = header.textContent.trim();
                if (text.length > 2) {
                    text = text.slice(0, 2);
                }
                header.textContent = text;
            });
        }, 0); 
    },

    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate > new Date()) {
        console.log(userSelectedDate);
        buttonStart.disabled = false;
        timer.start(userSelectedDate);

      } else {
        iziToast.show({
            message: 'Please choose a date in the future',
            messageColor: '#fff',
            messageSize: '16px',
            messageLineHeight: '150%',

            maxWidth: 302,
            position: 'topRight',
            backgroundColor: ' #ef4040',

            iconUrl: `../img/icon-error.svg`,
            
            iconColor: '#fff',
        });
        buttonStart.disabled = true;
      }

      
    },
};




flatpickr(`input#datetime-picker`, options);
buttonStart.disabled = true;

class Timer {
    constructor({ onTick }) {
        this.isActive = false;
        this.onTick = onTick;
        
        this.intervalId = null;
        this.targetTime = null;
    }

    start(targetDate) {
        if (this.isActive) {
            return;
        }

        this.targetTime = targetDate.getTime();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetTime - currentTime;
            const time = this.convertMs(deltaTime);
            this.onTick(time);

            if (deltaTime <= 0) {
                clearInterval(this.intervalId);
                this.isActive = false;
                this.onTick(this.convertMs(0));
                if (this.onComplete) {
                    this.onComplete();
                }
                buttonStart.disabled = true;
                return;
            }
        }, 1000)
    }

    convertMs(ms) {
    
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        
        const days = String(Math.floor(ms / day)).padStart(2, `0`);
        
        const hours = String(Math.floor((ms % day) / hour)).padStart(2, `0`);
        
        const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, `0`);
        
        const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, `0`);

        
      
        return { days, hours, minutes, seconds };
    }

}

function updateClock ({ days, hours, minutes, seconds }) {
    dataDays.textContent = `${days}`;
    dataHours.textContent = `${hours}`;
    dataMinutes.textContent = `${minutes}`;
    dataSeconds.textContent = `${seconds}`;
}


const timer = new Timer({
    onTick: updateClock, 
});

buttonStart.addEventListener('click', () => {
    if (userSelectedDate) {
        timer.start(userSelectedDate); 
        buttonStart.disabled = true;
    }
});





  
  
