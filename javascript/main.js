// CODING CALENDER

// localStorage.clear();
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
setInterval(setTime, 500);


const deleteIcon = document.getElementById('delete');


// creating todo-containers 

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

    localStorage.setItem(id, JSON.stringify(infoList));
    console.log(localStorage);

    // getContent();
}


// DELETING TODO ELEMENT

function removeElm(elem){
    elem.parentElement.parentElement.remove(); 
    console.log(elem.parentElement.parentElement.id);
    localStorage.removeItem(elem.parentElement.parentElement.id);

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


// I NEED TO CREATE A FUNCTION TO GET THE CONTENT IN SETINTERVA OF TIME
//  TO ENSURE THAT ALL THE CONTENT IS UPDATED TO THE LOCAL STORAGE


const todoContain = document.getElementsByClassName('todo-container');
function getContent(){

    // console.log(todoContain.length);
    if (todoContain.length > 0) {
        for (let i = 0; i < todoContain.length; i++) {

            let infoArray = []
            
            let dateInfo = todoContain[i].children[0].textContent;
            infoArray.push(dateInfo);
            
            let contentInfo = todoContain[i].children[1].textContent;
            infoArray.push(contentInfo);
            
            // console.log(infoArray);
            localStorage.setItem(todoContain[i].id, JSON.stringify(infoArray));
        }
    }
    
    
}

getContent();

setInterval(getContent, 100);


console.log(Object.entries(localStorage));

// RENDERING ALL PREVOUSLY STORED DATA AFTER REFERESHING IF EXISTS
for (let i = 0; i < Object.entries(localStorage).length; i++){
    
    let elemId = Object.entries(localStorage)[i][0];
    // console.log(JSON.parse(Object.entries(localStorage)[i][1]));
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


function createNew() {
    num++;
    let newId = 'todo' + num;
    let newDate = '6';
    let newInfo = 'write something...';
    cacheToDo(newId, newDate, newInfo);
    localStorage.setItem(newId, JSON.stringify([newDate, newInfo]));
}

const createNewBtn = document.getElementById('create');
createNewBtn.setAttribute('onclick', 'createNew()');

// localStorage.clear();