let GLOBAL_TASKS = [];

fetch("https://api.jsonbin.io/v3/b/663364bcacd3cb34a841d337", {
    method: 'GET',
    headers: {
        'X-Access-Key': '$2a$10$uijBkGRgwPq6MvdtMvc6ueYABEeHl7.QFovkwRgdqOrUIkXyqP4cC',
        'Content-Type': 'application/json'},
}).then(response => response.json()).then(data=> {
    console.log(data);
    GLOBAL_TASKS = data.record;
    GLOBAL_TASKS.forEach(task => loadFromBackend(task));
});

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const btn = document.querySelector(".submitBtn");
const taskForm = document.getElementById("taskForm");

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask === '') {
        return alert('Нужно что-то ввести');
    };
    taskInput.value = '';

    addTask([...GLOBAL_TASKS, {text:newTask, completed: false}]);
});

function saveToBackend(task) {
    fetch("https://api.jsonbin.io/v3/b/663364bcacd3cb34a841d337", {
        method: 'PUT',
        headers: {
            'X-Access-Key': '$2a$10$uijBkGRgwPq6MvdtMvc6ueYABEeHl7.QFovkwRgdqOrUIkXyqP4cC',
        'Content-Type': 'application/json'},
        body: JSON.stringify([task]),
    }).then(response => {
        console.log(response);
        if(!response.ok) {
            console.log("ошибка");
        }
        return response.json();
    });
};

function addTask(tasks) {
      saveToBackend(tasks);
};

const loadFromBackend = function(task) {
    console.log('task', task)
    const listItem = document.createElement('li');

    const checkBox = document.createElement('input');
    checkBox.setAttribute("value", task.text);
    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add("custom-checkbox");
    checkBox.checked = task.completed;

    listItem.appendChild(checkBox);

    const taskText = document.createElement('span');
    taskText.classList.add("taskSpan");
    taskText.textContent = task.text;
    listItem.appendChild(taskText);

    if (task.completed) {
        taskText.style.color = "#266559";
    } else {
        taskText.style.color = "#FFFFFF";
    }
    checkBox.addEventListener("change", function() {
        if (checkBox.checked) {
            taskText.style.color = "#266559";
        } else {
            taskText.style.color = "#FFFFFF";
        }
        saveToBackend({...task, completed: !task.completed})
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("DltBtn");
    listItem.appendChild(deleteButton);
    
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(listItem);
    saveToBackend(task)
    });

    listItem.addEventListener('mouseover', function() {
    deleteButton.style.display = 'block';
    });
    
    listItem.addEventListener('mouseout', function() {
    deleteButton.style.display = 'none';
    });

    taskList.appendChild(listItem);
    
    return task;
};