// CODING CALENDER
let months = ['January', 'Feburary', 'March', 'April', 'May', 'June'
        ,'July', 'August', 'September', 'October', 'November', 'December'];


let weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

let calender = document.querySelector('.calender');


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
    console.log(firstDay.getDay(), daysInaMonth); // firstday - 1 is total no of empty days


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

// THE RENDERING THE INITIAL CALENDER
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


// SETTING CURRENT TIME IN THE CLOCK

const hourDiv = document.getElementById('hour');
const minDiv = document.getElementById('min');
const secDiv = document.getElementById('sec');


function setTime() {
    let currentTime = new Date();

    let hours = currentTime.getHours();
    let mins = currentTime.getMinutes();
    let secs = currentTime.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (secs < 10) {
        secs = "0" + secs;
    }
    hourDiv.innerHTML = hours;
    minDiv.innerHTML = mins;
    secDiv.innerHTML = secs;
}

setTime();
setInterval(setTime, 1000);

const todoWrapper = document.getElementById('w2');

// to check if num already exists means that todos have already been applied
// ADDING NUM TO LOCAL STORAGE
if (localStorage.getItem('num') == NaN){
    let num = 1
    localStorage.setItem('num', JSON.stringify(num));
}
else {
    num = localStorage.getItem('num');
    num = JSON.parse(num);
}


// FUNCTION GENREATE A NEW SCHEDULE
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
    todoDate.setAttribute('contenteditable', 'true');
    todoDate.textContent = elem.innerHTML;

    let dt = new Date()
    let curDate = dt.getDate();

    if (curDate > todoDate.textContent) {
        todoDate.style.background = 'rgb(255, 70, 70)';
        todoDate.style.color = '#fff';
    }

    // SETTING THE DATE INTO THE LIST WHICH WILL BE A PART OF LOCAL STORAGE
    infoList.push(todoDate.textContent);  

    // CONTENT
    let todoContent = document.createElement('div');
    todoContent.setAttribute('class', 'todo-content');
    todoContent.setAttribute('contenteditable', 'true');
    todoContent.textContent = "write something...";


    // AN EVENT LISTENRE TO REMOVE PLACEHOLDER ONLY ONCE AND TO CHANGE SAVE ELEM COLOR
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

    //NOW APPENDING ALL ELEMENTS
    todoWrapper.appendChild(todoContainer);

    todoContainer.style.order = todoDate.textContent;

    todoContainer.appendChild(todoDate);
    todoContainer.appendChild(todoContent);
    todoContainer.appendChild(todoIcons);

    todoIcons.appendChild(spanIcon);

    // ADDING THE INFO INTO LOCAL STORAGE
    localStorage.setItem(id, JSON.stringify(infoList));

    // AS WE HAVE CREATED A NEW TODO WE HAVE NOT SAVED IT SO
    changeSavedColor();
}


const deleteIcon = document.getElementById('delete');


// DELETING TODO ELEMENTS
function removeElm(elem){
    elem.parentElement.parentElement.remove(); 
    localStorage.removeItem(elem.parentElement.parentElement.id);

    // THIS CHANGES THE SAVED DETAILS SO WE CHANGE THE COLOR
    changeSavedColor();
}


// FUNCTION TO RECREATE TODOS USING LOCAL STORAGE INFO
function cacheToDo(elem_id, date, info) { 
    // TODO CONTAINER
    let todoContainer = document.createElement('div');
    todoContainer.setAttribute('class', 'todo-container');
    todoContainer.setAttribute('id', elem_id);

    // DATE
    let todoDate = document.createElement('div');
    todoDate.setAttribute('class', 'todo-date flex');
    todoDate.setAttribute('contenteditable', 'true');
    todoDate.textContent = date;

    dt = new Date();
    let curDate = dt.getDate();
    if (curDate > date) {
        todoDate.style.background = 'rgb(255, 70, 70)';
        todoDate.style.color = '#fff';
    }

    // CONTENT
    let todoContent = document.createElement('div');
    todoContent.setAttribute('class', 'todo-content');
    todoContent.setAttribute('contenteditable', 'true');
    todoContent.textContent = info;


    // AN EVENT LISTENRE TO REMOVE PLACEHOLDER ONLY ONCE AND TO CHANGE SAVE ELEM COLOR
    todoContent.addEventListener('click', ()=> {
        todoContent.textContent = '';
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

    spanIcon.setAttribute('onclick', 'removeElm(this);');
    //NOW APPENDING ALL ELEMENTS

    todoWrapper.appendChild(todoContainer);

    todoContainer.style.order = date;
    todoContainer.appendChild(todoDate);
    todoContainer.appendChild(todoContent);
    todoContainer.appendChild(todoIcons);

    todoIcons.appendChild(spanIcon);
}


// ================ SAVE BTN =============

// ADDING THE CHANGES TO SAVE BTN
const saveAll = document.querySelector('#save');

// THE TEXT CONTENT OF SAVE
const saveContent = document.querySelector('.content');
saveAll.addEventListener('click', getContent);


// TO CHANGE THE COLOR OF THE SAVED BACK TO BLACK
function changeSavedColor(){
    saveAll.style.color = 'black';
    saveContent.textContent = 'save';
}
 
const todoContain = document.getElementsByClassName('todo-container');


// THIS FUNCTION WILL GET THE CONTENT OF THE SCHEDULE WHEN WE CLICK SAVE BTN
function getContent(){
    for (let i = 0; i < todoContain.length; i++) {
        let infoArray = []
        let dateInfo = todoContain[i].children[0].textContent;
        infoArray.push(dateInfo);
        let contentInfo = todoContain[i].children[1].textContent;
        infoArray.push(contentInfo);
        localStorage.setItem(todoContain[i].id, JSON.stringify(infoArray));
    }
    saveAll.style.color = 'rgb(18, 190, 18)';
    saveContent.textContent = 'saved';
}



// RENDERING ALL PREVOUSLY STORED DATA AFTER REFERESHING IF EXISTS
for (let i = 0; i < Object.entries(localStorage).length; i++){
    let elemId = Object.entries(localStorage)[i][0];
    if (elemId != 'num') {
        let dateCache = JSON.parse(Object.entries(localStorage)[i][1])[0];
        let contentCache = JSON.parse(Object.entries(localStorage)[i][1])[1];
        cacheToDo(elemId, dateCache, contentCache);
    }
}


// REMOVING ALL ELEMENTS WHEN CLICKING REMOVE ALL
// WE REMOVE ALL TODOCOTAINERS
function removeAll() {
    todoWrapper.querySelectorAll('.todo-container').forEach(n => n.remove());
    localStorage.clear();
}


const deleteAllBtn = document.getElementById('delete-all');
deleteAllBtn.setAttribute('onclick', 'removeAll()');
