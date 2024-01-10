let tasks=[];
const tasksList=document.getElementById('list');
const addTaskInput=document.getElementById('textBox');
const taskCounter=document.getElementById('taskCounter');
const addIcon=document.getElementById('addicon');
const allButton = document.getElementById('all');
const uncompleteButton = document.getElementById('uncomplete');
const completedButton = document.getElementById('completed');
const completeAllTasksButton = document.getElementById('completeAllTasks');
const clearCompletedButton = document.getElementById('clearCompleted');

//This adds the list item to the unorder list
function addTaskToDOM(task){
    const li=document.createElement('li');
    li.innerHTML=`
    <div id='taskEl'>
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}  class="custom-checkbox">
    <label for="${task.id}"> ${task.title} </label></div>
    <div id=deleteEl>
    <img src="plus.svg"  class="delete" data-id="${task.id}" /></div>
    `;
    tasksList.append(li);
}


//This renders the list after every change like new task added, deleted, completed and uncompleted
function renderlist() {
    tasksList.innerHTML = '';

    for (let j = 0; j < tasks.length; j++) {
        addTaskToDOM(tasks[j]);
    }
    taskCounter.innerHTML = `${tasks.length}`;
    highlightText();
    toggleNoTaskMessage();
    

}

//Add new task object to tasks array
function addTask(task){
    if(task){
        tasks.push(task);
        renderlist();
        return;
    }
}


//This marks the task completed
function markTaskAsComplete(taskId) {
    const task = tasks.filter(function (task) {
        return task.id === Number(taskId);
    });

    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        renderlist();
        
        return;
    }
    
}

//This deletes the task
function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id != Number(taskId);
    })

    tasks = newTasks;
    renderlist();
   
}


//It handles the input events like enter and click on add icon also creates a task object and call add task function
function handleInputEvent(e){
    const title=addTaskInput.value;
    if(e.key==='Enter'|| e.target.id==='addicon'){
        if(!title){
            return;
        }
    
        const task={
            title:title,
            id:Date.now(),
            completed:false
        }
        addTaskInput.value="";
        addTask(task);
        
    }
    
}

//It handles events like delete or marking the task complete/Incomplete
function handleClickListener(e){
    const target=e.target;
    if(target.className==='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;

    }else if(target.className==='custom-checkbox'){
        const taskId=target.id;
        markTaskAsComplete(taskId);
        return;

    }


}

//This filters the tasks based on their completed status
function filterTasks(filterType) {
    let filteredTasks = [];

    switch (filterType) {
        case 'all':
            filteredTasks = tasks;
            break;
        case 'uncomplete':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
        default:
            filteredTasks = tasks;
    }

    allButton.style.color = '';
    uncompleteButton.style.color = '';
    completedButton.style.color = '';

    
    document.getElementById(filterType).style.color = 'black';
    renderFilteredTasks(filteredTasks);

    
}
// This function renders the filters tasks and add task to DOM
function renderFilteredTasks(filteredTasks) {
    tasksList.innerHTML = '';
    for (let j = 0; j < filteredTasks.length; j++) {
        addTaskToDOM(filteredTasks[j]);
    }
}

// This highlights the task counter if task is present 
function highlightText(){
    if(taskCounter.innerHTML!=='0'){
        taskCounter.style.color="black";
    }else{
        taskCounter.style.color="lightgrey";
    }  
}



// This marks all taks completed
function completeAllTasks() {
    tasks.forEach(task => {
        task.completed = true;
    });

    renderlist();
}

//This marks all task Uncomplete
function clearCompletedTasks() {
    tasks.forEach(task => {
        if (task.completed) {
            task.completed = false;
        }
    });

    renderlist();
    
}



//This function runs when the page loads and activate the eventlisteners and few functions
function initializeApp(){
    addTaskInput.addEventListener('keyup', handleInputEvent);
    document.addEventListener('click', handleClickListener);
    addIcon.addEventListener('click', handleInputEvent);
    highlightText();
    allButton.style.color = 'black';
    createNoTaskMessage();
    
}
initializeApp();



//add tasks events
addTaskInput.addEventListener('keyup',handleInputEvent);
addIcon.addEventListener('click', handleInputEvent);
// Events-marking all task complete and uncomplete
completeAllTasksButton.addEventListener('click', completeAllTasks);
clearCompletedButton.addEventListener('click', clearCompletedTasks);

//Tasks filters click events
allButton.addEventListener('click', () => filterTasks('all'));
uncompleteButton.addEventListener('click', () => filterTasks('uncomplete'));
completedButton.addEventListener('click', () => filterTasks('completed'));

// this function to create the "No Task Present" message
function createNoTaskMessage() {
    const noTaskMessage = document.createElement('li');
    noTaskMessage.id = 'noTaskMessage';
    noTaskMessage.textContent = 'No Task Present';
    noTaskMessage.style.display = tasks.length === 0 ? 'block' : 'none';
    tasksList.appendChild(noTaskMessage);
}

function toggleNoTaskMessage() {
    const noTaskMessage = document.getElementById('noTaskMessage');
    if (noTaskMessage) {
        noTaskMessage.style.display = tasks.length === 0 ? 'block' : 'none';
    }
}



