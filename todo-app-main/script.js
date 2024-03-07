'use strict';

const userInputContainer = document.getElementById('input');
let myArray = [];
let idCounter = 1;
const itemsLeftDisplay = document.querySelector('.items__left');
const activeDisplayBtn = document.querySelector('.active__tasks');
const allDisplayBtn = document.querySelector('.all__tasks');
const completedDisplayBtn = document.querySelector('.completed__tasks');
const clearCompletedDisplayBtn = document.querySelector('.clear__tasks');


window.addEventListener('load', function() {
    const storedData = localStorage.getItem('myArray');
    if (storedData) {
        myArray = JSON.parse(storedData);
        displayTasks(myArray);
        updateTaskCount();
    }
});

input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTask();
        updateLocalStorage();
        userInputContainer.value = '';
        updateTaskCount();
    }
});

function addTask() {
    const userInput = input.value.trim();
    if (userInput === '') {
        return;
    }

    const listInfos = {
        'id': idCounter++,
        'task': userInput,
        'completed': false,
    };

    myArray.push(listInfos);
    displayTasks(myArray);
}

function displayTasks(tasks) {
    list.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="list-item" id="list-item-${task.id}">
                <label for="check"></label>
                <div class="inner">
                    <div class="checkbox-container">
                        <input type="checkbox" class="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}>
                    </div>
                    <p class="task__name ${task.completed ? 'strikethrough' : ''}">${task.task}</p>
                </div>
                <div class="close" id="${task.id}">
                     <div class="svg-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" class="svg">
                            <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"/>
                        </svg>
                    </div>
                </div>
            </div>
        `;
        list.appendChild(listItem);

        const checkbox = listItem.querySelector('.checkbox');
        const taskTextElement = listItem.querySelector('.task__name');

        checkbox.addEventListener('click', function (event) {
            const checkbox = event.target;
            const taskId = parseInt(checkbox.id);

            const taskToUpdate = myArray.find(task => task.id === taskId);

            if (taskToUpdate) {
                taskToUpdate.completed = checkbox.checked;
                updateLocalStorage();
                updateTaskCount();
                taskTextElement.classList.toggle('strikethrough', checkbox.checked);
            }
        });

        const closeButton = listItem.querySelector('.close');
        closeButton.addEventListener('click', function (e) {
            const clickedCloseBtn = e.currentTarget;
            const indexToDelete = myArray.findIndex(task => task.id === parseInt(clickedCloseBtn.id));

            if (indexToDelete !== -1) {
                myArray.splice(indexToDelete, 1);
                updateLocalStorage();
            }

            const listItemToRemove = clickedCloseBtn.closest('.list-item');
            listItemToRemove.remove();
            updateTaskCount();
        });
    });
}


function updateTaskCount() {
    const totalTaskCount = myArray.length;
    const finishedTaskCount = myArray.filter(task => task.completed === true).length;
    const remainingTaskCount = totalTaskCount - finishedTaskCount;
    itemsLeftDisplay.textContent = `${remainingTaskCount} items left`;
}

function updateLocalStorage() {
    localStorage.setItem('myArray', JSON.stringify(myArray));
}

function displayAllTasks() {
    list.innerHTML = '';
    displayTasks(myArray);
    updateTaskCount();
}

function displayAllActiveTasks() {
    const activeTasks = myArray.filter(task => task.completed === false);
    displayTasks(activeTasks);
    updateTaskCount();
}

function displayAllCompletedTasks() {
    const completedTasks = myArray.filter(task => task.completed === true);
    displayTasks(completedTasks);
    updateTaskCount();
}

function displayClearCompletedTasks() {
    myArray = myArray.filter(task => !task.completed);
    displayTasks(myArray);
    updateTaskCount();
}

activeDisplayBtn.addEventListener('click', function() {
    displayAllActiveTasks();
});

allDisplayBtn.addEventListener('click', function() {
    displayAllTasks();
});

completedDisplayBtn.addEventListener('click', function() {
    displayAllCompletedTasks();
});

clearCompletedDisplayBtn.addEventListener('click', function() {
    displayClearCompletedTasks();
});
