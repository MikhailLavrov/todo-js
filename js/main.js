const form = document.querySelector('#form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#tasksList');
const emptyList = `
      <li class="list-group-item bg-light p-5 rounded-5 mb-1" id="emptyList">
      <div class="d-flex justify-content-center mb-5">
        <img width="100" src="./img/empty.svg" alt="Empty container icon.">
      </div>
      <p class="text-center fs-1 lh-1 m-0">Task list is empty</p>
      </li>`;

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks);
    tasks.forEach(task => renderTask(task));
  };

checkIsEmpty();

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
taskList.addEventListener('click', doneTask);

function addTask(evt) {
  evt.preventDefault();

  const taskText = taskInput.value;

  let newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  if (!taskInput.value) return;
  
  renderTask(newTask);

  tasks.push(newTask);
        
  taskInput.value = '';
  taskInput.focus();

  checkIsEmpty();
  saveToStorage();
};

function removeTask(evt) {
  if (evt.target.dataset.action !== "delete") return;

  const parentNode = evt.target.closest('li');

  let id = Number(parentNode.id);

  // delete task from array
  tasks = tasks.filter(function(task) {
    if (task.id === id) {
      return false;
    } else {
      return true;
    };
  });

  parentNode.remove();

  checkIsEmpty();
  saveToStorage();
};

function doneTask(evt) {
  if (evt.target.dataset.action !== 'done') return;
  const parentItem = evt.target.closest('li');
  const doneText = parentItem.querySelector('span');

  let id = Number(parentItem.id);
  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;

  doneText.classList.toggle('task-done');

  console.log(task, tasks);
  checkIsEmpty();
  saveToStorage();
};

function checkIsEmpty() {
  if (tasks.length === 0) {
    taskList.insertAdjacentHTML('beforebegin', emptyList);
  }

  if (tasks.length > 0) {
    const emptyItem = document.querySelector('#emptyList');
    emptyItem ? emptyItem.remove() : null;
  }

  saveToStorage();
};

function renderTask(task) {
  const doneClass = task.done ? 'task-done' : null;

  const newTask = `
        <li class="new-task bg-light rounded-5 d-flex p-3 mb-1" id="${task.id}">
          <span class="${doneClass} h4 m-0">${task.text}</span>
          <div class="ms-auto ps-3 d-flex align-items-center gap-2 justify-content-center">
            <button class="btn btn-outline-success d-flex p-0" type="button" data-action="done">
              <ion-icon size="large" name="checkmark-done-outline"></ion-icon>
            </button>
            <button class="btn btn-outline-danger d-flex p-0" type="button" data-action="delete">
              <ion-icon size="large" name="close-outline"></ion-icon>
            </button>
          </div>  
        </li>`;
  
  taskList.insertAdjacentHTML('beforeend', newTask);
};

function saveToStorage() {
  console.log('saveToStorage', tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
