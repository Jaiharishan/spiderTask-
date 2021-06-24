// HACKER MODE 

// CREATING CALENDER

let months = ['January', 'Feburary', 'March', 'April', 'May', 'June'
        ,'July', 'August', 'September', 'October', 'November', 'December'];

let weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

let calender = document.querySelector('.calender.grid-spl');


// TO KEEP IN TRACK OF WHICH MONTH WE ARE IN COMPARED TO CURRENT MONTH
let nav = 0;


function renderCalender(nav) {
    let dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }
    let year = dt.getFullYear();
    let month = dt.getMonth();

    
    let daysInaMonth = new Date(year, month + 1, 0).getDate();

    let firstDay = new Date(year, month, 1);
    // FIRSTDAY - 1 IS THE TOTAL NUMBER OF EMPTY DAYS


    //CREATING HEADER 

    let calenderHeader = document.createElement('div');
    calenderHeader.setAttribute('class', 'calender-header flex');


    let monthName = document.createElement('div');
    monthName.setAttribute('class', 'month-name');
    monthName.innerHTML = months[month] + ' ' + year;


    let leftBtn = document.createElement('button');
    leftBtn.setAttribute('class', 'prev-month');
    leftBtn.setAttribute('onclick', 'leftNav()');

    let rightBtn = document.createElement('button');
    rightBtn.setAttribute('class', 'next-month');
    rightBtn.setAttribute('onclick', 'rightNav()');

    let leftArrow = document.createElement('span');
    leftArrow.setAttribute('class', 'iconify');
    leftArrow.setAttribute('data-icon', 'akar-icons:arrow-left');
    leftArrow.setAttribute('data-inline', 'false');

    let rightArrow = document.createElement('span');
    rightArrow.setAttribute('class', 'iconify');
    rightArrow.setAttribute('data-icon', 'akar-icons:arrow-right');
    rightArrow.setAttribute('data-inline', 'false');


    // ADDING CREATED ELEMENTS TO ITS PARENT ELEMENT
    leftBtn.appendChild(leftArrow);
    rightBtn.append(rightArrow);

    calenderHeader.appendChild(leftBtn);
    calenderHeader.appendChild(monthName);
    calenderHeader.appendChild(rightBtn);

    calender.appendChild(calenderHeader);


    //CREATING WEEKS

    for (let i = 0; i < weekDays.length; i++) {
        let week = document.createElement('div');
        week.setAttribute('class', 'week flex');
        week.innerHTML = weekDays[i];
        calender.appendChild(week);
    }

    // CREATING DATES

    // EMPTY DATES
    for (let i = 0; i < firstDay.getDay() - 1; i++) {
        let dateDiv = document.createElement('div');
        dateDiv.setAttribute('class', 'date flex');
        calender.appendChild(dateDiv);
    }

    // ACTUAL DAYS
    for (let i = 0; i < daysInaMonth; i++) {
        let dateDiv = document.createElement('div');
        dateDiv.setAttribute('class', 'date flex');
        dateDiv.setAttribute('onclick', 'createToDo(this)');
        dateDiv.innerHTML = i + 1;
        calender.appendChild(dateDiv);
        if (dateDiv.innerHTML == new Date().getDate()) {
            dateDiv.style.background = 'rgb(185, 253, 255)';
        }
    }

    // EMPTY DATES AGAIN
    for (let i = 0; i < 42 - (firstDay.getDay() - 1 + daysInaMonth); i++) {
        let dateDiv = document.createElement('div');
        dateDiv.setAttribute('class', 'date flex');
        calender.appendChild(dateDiv);
    }

}

// RENDERING CURRENT MONTH INITIALLY
renderCalender(nav);


// FUNCTION TO MOVE TO PREVIOUS AND NEXT MONTH

function leftNav() {
    nav--;
    calender.innerHTML = '';
    renderCalender(nav);
}

function rightNav() {
    nav++;
    calender.innerHTML = '';
    renderCalender(nav);
}



// CREATING DIGITAL AND ANALOG CLOCKS

// =================== DIGITAL CLOCK AND ANALOG CLOCK =======================


// ELEMENTS IN DIGITAL CLOCK
const hourDiv = document.getElementById('hour');
const minDiv = document.getElementById('min');
const secDiv = document.getElementById('sec');


// ELEMENTS IN ANALOG CLOCK
const hourHand = document.querySelector('.hand.hour-ana');
const minHand = document.querySelector('.hand.min-ana');
const secHand = document.querySelector('.hand.sec-ana');

// THE TIME INPUT
const timeChoice = document.querySelector('#time-choice');

// INTIALIZING THE DATE OBJECT
let customTime = new Date();


// TO UPDATE THE CUSTOMIZED TIME WE CHANGED
function getCustomTime(time) {
    customs = time.split(':');
    customTime.setHours(customs[0]);
    customTime.setMinutes(customs[1]);
    customTime.setSeconds(customs[2]);

    customSeconds = customTime.getSeconds();
    customMinutes = customTime.getMinutes();
    customHours = customTime.getHours();
}

// BUTTON TO ALLOW USER TO SET THE TIME
const getCustomTimeBtn = document.querySelector('.btn.btn-set');


getCustomTimeBtn.addEventListener('click', ()=> {
    getCustomTime(timeChoice.value);
})

// SETTING SEC, MIN AND HOUR TO VARIABLES
let customSeconds = customTime.getSeconds();
let customMinutes = customTime.getMinutes();
let customHours = customTime.getHours();



// THIS FUNCTION IS USED BOTH FOR GENDRAL AND CUSTOMIZED TIME
// IN THIS FUCTION BOTH DIGITAL AND ANALOG CLOCK GET CUSTOMIZED
function setCustomTime() {
    customSeconds++;
    
    if (customSeconds > 59) {
        customSeconds = 0;
        customMinutes ++;
    }
    if(customMinutes > 59) {
        customMinutes = 0;
        customHours++;
    }
    if(customHours > 23) {
        customHours = 0;
    }

    // FOR ANALOG CLOCK
    let secondsRatio = customSeconds / 60;
    let minutesRatio = (secondsRatio + parseInt(customMinutes)) / 60;
    let hoursRatio = (minutesRatio + parseInt(customHours)) / 12; 


    // DIGITAL CONVENTION
    if (customHours < 10) {
        customHours = "0" + parseInt(customHours);
    }
    if (customMinutes < 10) {
        customMinutes = "0" + parseInt(customMinutes);
    }
    if (customSeconds < 10) {
        customSeconds = "0" + customSeconds;
    }
    
    // FOR DIGITAL CLOCK
    hourDiv.textContent = customHours;
    minDiv.textContent = customMinutes;
    secDiv.textContent = customSeconds;

    // CALLING SETROTATION FUNCTION FOR ALL HANDS
    setRotation(secHand, secondsRatio);
    setRotation(minHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
}


// INITIAL SETTING OF CLOCK
setCustomTime();


// TO RUN THE CLOCK CONTINOUSLY 
setInterval(setCustomTime, 1000);


// TO MAKE THE HANDS ROTATE IN ANALOG CLOCK
function setRotation(elem, rotation) {
    elem.style.setProperty('--angle', rotation * 360);
}



// =================== SETTING CHOICES ========================

const digitalChoice = document.getElementById('digi');
const analogChoice = document.getElementById('ana');

const choiceBg = document.querySelector('.choice-bg');

const digitalClock = document.querySelector('.clock');
const analogClock = document.querySelector('.clock-analog');




analogChoice.addEventListener('click', () => {
    choiceBg.style.transform = 'translate(100%)';
    analogClock.style.display = 'block';
    digitalClock.style.display = 'none';

})


digitalChoice.addEventListener('click', () => {
    choiceBg.style.transform = 'translate(0%)';
    analogClock.style.display = 'none';
    digitalClock.style.display = 'flex';
})



// =========== ADDITIONAL CLOCK STYLES =============


const colorBtn = document.querySelector('.btn.btn-ok');
const colorSelector = document.querySelector('#colors');


colorBtn.addEventListener('click', ()=> {
    let curColor = colorSelector.value;
    analogClock.style.background = curColor;
})


// TO MAKE THE SIZES OF THE HAND SHRINK AND EXPAND

const rangeBarSec = document.querySelector('#range-sec');
const rangeBarMin = document.querySelector('#range-min');
const rangeBarHour = document.querySelector('#range-hour');


rangeBarSec.addEventListener('click', ()=> {
    let rangeVal = rangeBarSec.value / 100;
    secHand.style.height = 44 * rangeVal + '%';
})


rangeBarMin.addEventListener('click', ()=> {
    let rangeVal = rangeBarMin.value / 100;
    minHand.style.height = 40 * rangeVal + '%';
})


rangeBarHour.addEventListener('click', ()=> {
    let rangeVal = rangeBarHour.value / 100;
    hourHand.style.height = 32 * rangeVal + '%';
})


// ADDING SOUNDS
function ticSound() {
    let sound = document.createElement('audio');
    sound.src = '/assets/4o059-dvh7w.wav';
    sound.setAttribute('autoplay', 'true');
    sound.setAttribute('loop', 'true');
    digitalClock.appendChild(sound);
}

ticSound();


// TO HAVE CONTROL OVER THE SOUND
const soundBtn = document.querySelector('.btn.btn-sound');


soundBtn.addEventListener('click', () => {
    if (soundBtn.textContent == 'Mute') {
        document.querySelector('audio').remove();
        soundBtn.textContent = 'unmute';
    }
    else if(soundBtn.textContent == 'unmute') {
        ticSound();
        soundBtn.textContent = 'Mute';
    }
})


// ======================== CREATING TODOS ========================== //


const todoWrapper = document.getElementById('w2');
const completed = document.getElementById('completed');
const pending = document.getElementById('pending');


// TO CHECK IF NUM ALREADY IN LOCALSTORAGE OR ELSE WE CAN CREATE ONE
if (localStorage.getItem('num') == NaN){
    let num = 1;
    localStorage.setItem('num', JSON.stringify(num));
}
else {
    num = localStorage.getItem('num');
    num = JSON.parse(num);
}


// THIS FUNCTION CREATES A NEW TODO WHEN THE USER WANTS TO
function createToDo(elem) { 
    num = num + 1;
    let id = 'todo' + num;

    localStorage.setItem('num', JSON.stringify(num));

    infoList = []    
    // TODO CONTAINER
    let todoContainer = document.createElement('div');
    todoContainer.setAttribute('class', 'todo-container');
    todoContainer.setAttribute('id', id);

    // DATE
    let todoDate = document.createElement('div');
    todoDate.setAttribute('class', 'todo-date flex');
    todoDate.textContent = elem.innerHTML;
    
    let dt = new Date();
    curDate = dt.getDate();

    if(parseInt(todoDate.textContent) < curDate){
        todoDate.style.background = 'rgb(255, 70, 70)';
        todoDate.style.color = 'white';
    }
    // SETTING THE DATE INTO THE LIST WHICH WILL BE A PART OF LOCAL STORAGE
    infoList.push(todoDate.textContent);  

    // CONTENT
    let todoContent = document.createElement('div');
    todoContent.setAttribute('class', 'todo-content');
    todoContent.setAttribute('contenteditable', 'true');
    todoContent.textContent = "write something....";

    
    // ADDING A CLICK EVENT WHERE THE FIRST TIME WE CLICK IT THE TEXT CLEARS
    todoContent.addEventListener('click', ()=> {
        todoContent.textContent = '';
    }, {once:true})
    todoContent.addEventListener('click', changeSavedColor)


    // SETTING THE CONTENT INTO THE LIST WHICH WILL BE A PART OF LOCAL STORAGE
    infoList.push(todoContent.textContent);

    // ICONS
    let todoIcons = document.createElement('div');
    todoIcons.setAttribute('class', 'icons flex');

    // FOR THE SPAN ICON
    let spanIcon = document.createElement('span');
    spanIcon.setAttribute('class', 'iconify');
    spanIcon.setAttribute('id', 'delete');
    spanIcon.setAttribute('data-icon', 'ant-design:delete-outlined');
    spanIcon.setAttribute('data-inline', 'false');

    spanIcon.setAttribute('onclick', 'removeElm(this);');

    let spanIcon2 = document.createElement('span');
    spanIcon2.setAttribute('class', 'iconify');
    spanIcon2.setAttribute('id', 'status');
    spanIcon2.setAttribute('data-icon', 'teenyicons:tick-circle-outline');
    spanIcon2.setAttribute('data-inline', 'false');

    
    // STATUS OF THE TASK
    let status = 0;

    // ADDING THE STATUS VARIBLE TO INFOLIST
    infoList.push(status);

    // CHECKING THE STATUS OF THE TASK
    spanIcon2.setAttribute('onclick', 'changeStatus(this)');
    
    
    //NOW APPENDING ALL ELEMENTS

    // INITIALLY EVERY TASK IS NOT DONE
    pending.appendChild(todoContainer);
    todoContainer.style.order = todoDate.textContent;
    todoContainer.appendChild(todoDate);
    todoContainer.appendChild(todoContent);
    todoContainer.appendChild(todoIcons);

    todoIcons.appendChild(spanIcon2);
    todoIcons.appendChild(spanIcon);

    // STORING THE INFO WE GOT IN LOCAL STORAGE
    localStorage.setItem(id, JSON.stringify(infoList));
    
    // AS WE HAVE CREATED A NEW TODO WE HAVE NOT SAVED IT SO
    changeSavedColor();

}


// DELETING TODO ELEMENT
const todoContain = document.getElementsByClassName('todo-container');
const removeBtn = document.querySelector('#delete-all');


removeBtn.addEventListener('click', ()=> {
    pending.querySelectorAll('.todo-container').forEach(n => n.remove());
    completed.querySelectorAll('.todo-container').forEach(n => n.remove());
    localStorage.clear();
})


// THIS WILL REMOVE THE TODO ELEMENT
function removeElm(elem){
    elem.parentElement.parentElement.remove(); 
    localStorage.removeItem(elem.parentElement.parentElement.id);
    changeSavedColor();
}


// THIS FUNCTION IS TO MOVE THE COMPLETED TASK TO THE COMPLETED - CONTAINER AND THE VICE VERSA
function changeStatus(elem) {
    let PendorComp = elem.parentElement.parentElement.parentElement

    let storageKey = elem.parentElement.parentElement.id;
    if (PendorComp == pending) {
        completed.appendChild(elem.parentElement.parentElement);
        elem.style.color = 'rgb(18, 190, 18)';

        let cache = localStorage.getItem(storageKey);
        cache = JSON.parse(cache);
        cache[2] = 1;

        localStorage.setItem(storageKey, JSON.stringify(cache));
    }
    else if (PendorComp == completed) {
        pending.appendChild(elem.parentElement.parentElement);
        elem.style.color = 'black';

        let cache = localStorage.getItem(storageKey);
        cache = JSON.parse(cache);
        cache[2] = 0;

        localStorage.setItem(storageKey, JSON.stringify(cache));
    }
    changeSavedColor();
}


// ADDING THE CHANGES TO SAVE BTN
const saveAll = document.querySelector('#save');
saveAll.addEventListener('click', getContent);


// TO CHANGE THE COLOR OF THE SAVED BACK TO BLACK
function changeSavedColor(){
    saveAll.style.color = 'black';
    saveContent.textContent = 'save';
}


const saveContent = document.querySelector('.content');


// TO UPDATE THE DATA REGULARLY
function getContent(){
    for (let i = 0; i < todoContain.length; i++) {
        let dateInfo = todoContain[i].children[0].textContent;
        let contentInfo = todoContain[i].children[1].textContent;
        let statusContent = JSON.parse(localStorage.getItem(todoContain[i].id))[2];
        let infoArray = [dateInfo, contentInfo, statusContent]
        localStorage.setItem(todoContain[i].id, JSON.stringify(infoArray));
        console.log(infoArray);
    }
    saveAll.style.color = 'rgb(18, 190, 18)';
    saveContent.textContent = 'saved';
}


// NOW WE GET THE DATA STORED IN THE LOCAL STORAGE AND RENDER THAT INFO
function renderTodos(elemId, date, content, status) {

    // TODO CONTAINER
    let todoContainer = document.createElement('div');
    todoContainer.setAttribute('class', 'todo-container');
    todoContainer.setAttribute('id', elemId);

    // DATE
    let todoDate = document.createElement('div');
    todoDate.setAttribute('class', 'todo-date flex');
    todoDate.textContent = date;

    // CHECKING IF THE TASK IS OFF THE DEADLINE
    let dt = new Date();
    curDate = dt.getDate();

    if(parseInt(todoDate.textContent) < curDate){
        console.log('works');
        todoDate.style.background = 'rgb(255, 70, 70)';
        todoDate.style.color = 'white';
    }

    // CONTENT
    let todoContent = document.createElement('div');
    todoContent.setAttribute('class', 'todo-content');
    todoContent.setAttribute('contenteditable', 'true');
    todoContent.textContent = content;

    // ADDING A CLICK EVENT WHERE THE FIRST TIME WE CLICK IT THE TEXT CLEARS
    todoContent.addEventListener('click', ()=> {
        todoContent.textContent = '';
        saveAll.style.color = 'black';

    }, {once:true})
    todoContent.addEventListener('click', changeSavedColor)

    // ICONS
    let todoIcons = document.createElement('div');
    todoIcons.setAttribute('class', 'icons flex');

    // FOR THE SPAN ICON
    let spanIcon = document.createElement('span');
    spanIcon.setAttribute('class', 'iconify');
    spanIcon.setAttribute('id', 'delete');
    spanIcon.setAttribute('data-icon', 'ant-design:delete-outlined');
    spanIcon.setAttribute('data-inline', 'false');

    // TO REMOVE THE TASK
    spanIcon.setAttribute('onclick', 'removeElm(this);');

    let spanIcon2 = document.createElement('span');
    spanIcon2.setAttribute('class', 'iconify');
    spanIcon2.setAttribute('id', 'status');
    spanIcon2.setAttribute('data-icon', 'teenyicons:tick-circle-outline');
    spanIcon2.setAttribute('data-inline', 'false');

    // CHECKING THE STATUS OF THE TASK
    spanIcon2.setAttribute('onclick', 'changeStatus(this)');
    

    //NOW APPENDING ALL ELEMENTS

    // WE KNOW BY STATUS IF IT IS COMPLETED OR PENDING
    if (status) {
        completed.appendChild(todoContainer);
        spanIcon2.style.color = 'rgb(18, 190, 18)';
    }
    else {
        pending.appendChild(todoContainer);
        spanIcon2.style.color = 'black';
    }

    todoContainer.style.order = date;

    todoContainer.appendChild(todoDate);
    todoContainer.appendChild(todoContent);
    todoContainer.appendChild(todoIcons);

    todoIcons.appendChild(spanIcon2);
    todoIcons.appendChild(spanIcon);
}


// NOW USING THE RENDERTODOS FUNCTION WE RENDER ALL THE DATA IN LOCAL STORAGE
for(let i = 0; i < Object.entries(localStorage).length; i++) {
    if(Object.entries(localStorage)[i][0] !== 'num') {
        let elemId = Object.entries(localStorage)[i][0];
        let dataCache = JSON.parse(Object.entries(localStorage)[i][1])[0];
        let contentCache = JSON.parse(Object.entries(localStorage)[i][1])[1];
        let statusCache = JSON.parse(Object.entries(localStorage)[i][1])[2];
            
        renderTodos(elemId, dataCache, contentCache, statusCache);
    }
}



