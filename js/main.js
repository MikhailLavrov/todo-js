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

checkIsEmpty();

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);

function addTask(evt) {
  evt.preventDefault();

  const newTask = `
        <li class="bg-light rounded-5 d-flex p-3 mb-1"">
          <span class="h4 m-0">${taskInput.value}</span>
          <div class="ms-auto ps-3 d-flex align-items-center gap-2 justify-content-center">
            <button class="btn btn-outline-success d-flex p-0" type="button" data-action="done">
              <ion-icon size="large" name="checkmark-done-outline"></ion-icon>
            </button>
            <button class="btn btn-outline-danger d-flex p-0" type="button" data-action="delete">
              <ion-icon size="large" name="close-outline"></ion-icon>
            </button>
          </div>  
        </li>`;

  if (!taskInput.value) return;
  else {
    taskList.insertAdjacentHTML('beforeend', newTask);
    tasks.push(newTask);
    console.log(tasks);
  }
        
  taskInput.value = '';
  taskInput.focus();

  checkIsEmpty();
};

function removeTask(evt) {
  if (evt.target.dataset.action !== "delete") return;

  const task = evt.target.closest('li');

  task.remove();
  tasks.pop(task);
  console.log(tasks);
  checkIsEmpty()
};

function checkIsEmpty() {
  
  if (tasks.length === 0) {
    taskList.insertAdjacentHTML('beforebegin', emptyList);
  }

  if (tasks.length > 0) {
    const emptyItem = document.querySelector('#emptyList');
    emptyItem ? emptyItem.remove() : null;
  }
}

















// const form = document.querySelector('#form');
// const taskInput = document.querySelector('#task-input');
// const tasksList = document.querySelector('#tasksList');
// const emptyListHTML = `
//       <li class="list-group-item bg-light p-5 rounded-5 mb-1" id="emptyList">
//       <div class="d-flex justify-content-center mb-5">
//         <img width="100" src="./img/empty.svg" alt="Empty container icon.">
//       </div>
//       <p class="text-center fs-1 lh-1 m-0">Task list is empty</p>
//       </li>`;

// let tasks = [];

// if (localStorage.getItem('tasks')) {
//   tasks = JSON.parse(localStorage.getItem('tasks'));
//   tasks.forEach(task => renderTask(task));
// };

// checkEmpty();

// form.addEventListener('submit', addTask);
// tasksList.addEventListener('click', deleteTask)
// tasksList.addEventListener('click', doneTask)

// function addTask(evt) {
//   evt.preventDefault();

//   const taskText = taskInput.value;
//   const newTask = {
//     id: Date.now(),
//     text: taskText,
//     done: false,
//   }

//   tasks.push(newTask);

//   renderTask(newTask);

//   taskInput.value = '';
//   taskInput.focus();
//   saveToLocalStorage();
//   checkEmpty();
// }

// function deleteTask(evt) {
//   if (evt.target.dataset.action !== 'delete') return;
  
//   const parentNode = evt.target.closest('li');
//   const id = Number(parentNode.id);

//   // delete task from array
//   tasks = tasks.filter(function(task) {
//     if (task.id === id) {
//      return false;
//     } else {
//       return true;
//     }
//   });

//   // delete task from layout
//   parentNode.remove();
//   checkEmpty();
//   saveToLocalStorage();
// }

// function doneTask(evt) {
//   if (evt.target.dataset.action !== 'done') return;

//   const parentNode = evt.target.closest('li');
//   const taskTitle = parentNode.querySelector('span');

//   const id = Number(parentNode.id);
//   const task = tasks.find((task) => task.id === id);

//   task.done = !task.done;

//   taskTitle.classList.toggle('task-done');
//   saveToLocalStorage();
//   checkEmpty();
// }

// function checkEmpty() {
//   if (tasks.length === 0) {
//     tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
//   }

//   if (tasks.length > 0) {
//     const emptyList = document.querySelector('#emptyList');
//     emptyList ? emptyList.remove() : null;
//   }
// }

// function saveToLocalStorage() {
//   localStorage.setItem('tasks', JSON.stringify(tasks))
// }

// function renderTask(task) {
//   const cssClass = task.done ? 'task-done' : '';
//   const taskHtml = `
//         <li class="bg-light rounded-5 d-flex p-3 mb-1" id="${task.id}">
//           <span class="${cssClass} h4 m-0">${task.text}</span>
//           <div class="ms-auto ps-3 d-flex align-items-center gap-2">
//             <button class="btn btn-outline-success" type="button" data-action="done">
//               <img width="20" src="./img/checkmark.svg" alt="Check icon.">
//             </button>
//             <button class="btn btn-outline-danger" type="button" data-action="delete">
//               <img width="20" src="./img/cross.svg" alt="Delete icon.">
//             </button>
//           </div>  
//         </li>`;

//   if (task.text) {
//     tasksList.insertAdjacentHTML('beforeend', taskHtml);
//   }
// }
