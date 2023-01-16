const addForm = document.querySelector('#addForm');
const addInput = document.querySelector('#addInput');
const addButton = document.querySelector('#addButton');
const taskList = document.querySelector('#taskList');
// const templateFragment = document.querySelector('#newTemplate').content;
// const template = templateFragment.querySelector('li');
const emptyItem = `<li class="list-group-item d-flex align-items-center justify-content-center border-0 rounded" id="emptyItem">
Empty
</li>`

window.addEventListener('DOMContentLoaded', () => {
  let tasks = [];

  if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.forEach(task => renderTask(task));
    };

  checkIsEmpty();
  
  function addTask(evt) {
    evt.preventDefault();

    addInput.focus();
  
    const taskText = addInput.value;
  
    let newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };
  
    if (!addInput.value) return;
    
    renderTask(newTask);
  
    tasks.push(newTask);
          
    addInput.value = '';
    addInput.focus();
  
    checkIsEmpty();
    saveToStorage();
  };
  
  function renderTask(task) {
    const doneClassText = task.done ? 'done-text' : null;
    const doneClassItem = task.done ? 'done-item' : null;
  
    const newTask = `
    <li class="${doneClassItem} list-group-item d-flex align-items-center border-0 mb-1 rounded new-item" id="${task.id}" 
      style="background-color: #f5fcff;">
      <span class="${doneClassText} w-100 overflow-hidden" id="taskText">${task.text}</span>
      
      <div class="ms-auto d-flex align-items-center gap-2 justify-content-center ps-2">
      <button class="btn  btn-outline-info btn-sm" type="button" data-action="edit">&#9998;</button>
        <button class="btn btn-outline-success btn-sm" type="button" data-action="done">&#10003;</button>
        <button class="btn btn-outline-danger btn-sm" type="button" data-action="delete">&#10005;</button>
      </div>
    </li>`;
    
    taskList.insertAdjacentHTML('afterbegin', newTask);
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
  
    doneText.classList.toggle('done-text');
    parentItem.classList.toggle('done-item');
  
    checkIsEmpty();
    saveToStorage();
  };

  function checkIsEmpty() {
    if (tasks.length === 0) {
      taskList.insertAdjacentHTML('beforebegin', emptyItem);
    }
  
    if (tasks.length > 0) {
      const emptyItem = document.querySelector('#emptyItem');
      emptyItem ? emptyItem.remove() : null;
    }
  
    saveToStorage();
  };

  function saveToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  function makeItemEditable(evt) {
    if (evt.target.textContent !== '✎') return;
    let editTargetButton = evt.target;
    let targetParent = editTargetButton.closest('li');
    let targetText = targetParent.querySelector('span');
    
    targetText.setAttribute('contenteditable', true);
    targetText.classList.add('editable-text');
    editTargetButton.textContent = 'Save'
    // set focus to the end of text length
    const range = document.createRange();
    range.selectNodeContents(targetText);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    // -----------------------------------
    let id = Number(targetParent.id);
    const task = tasks.find((task) => task.id === id);
    
    const finishEdition = (evt) => {
      if (evt.target !== targetText || evt.keyCode == 13) {
        targetText.removeAttribute('contenteditable');
        targetText.classList.remove('editable-text');
        editTargetButton.innerHTML = '&#9998;'
        
        task.text = targetText.textContent;
        saveToStorage();

        document.removeEventListener('click', finishEdition);
        document.removeEventListener('keydown', finishEdition);
        document.addEventListener('click', (evt) => evt.target.dataset.action === 'edit' ? makeItemEditable : null);
      };
    };
    
    document.addEventListener('click', finishEdition);
    document.addEventListener('keydown', finishEdition);
  };

  document.addEventListener('click', (evt) => {
    const target = evt.target.dataset.action;
    switch (target) {
      case 'edit':
        makeItemEditable(evt);
        break;
      case 'done':
        doneTask(evt);
        break;
      case 'delete':
        removeTask(evt);
        break;
      case 'addNew':
        addTask(evt);
        break;
      default:
        return;
    }
  })
});
