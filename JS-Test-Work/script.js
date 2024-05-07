
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const btn = document.querySelector(".submitBtn");
const taskForm = document.getElementById("taskForm");

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask === '') {
        return alert('Нужно ввести что-то');
    };
    taskInput.value = '';

    addTask({text:newTask, completed: false});
});

function addTask(task = {text:'', completed: false}) {
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


    checkBox.addEventListener("change", function() {
        if (checkBox.checked) {
            taskText.style.color = "#266559";
        } else {
            taskText.style.color = "#FFFFFF";
        }
        saveToLocalStorage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("DltBtn");
    listItem.appendChild(deleteButton);
    
    deleteButton.addEventListener('click', function() {
    taskList.removeChild(listItem);
    saveToLocalStorage();
    });

    listItem.addEventListener('mouseover', function() {
    deleteButton.style.display = 'block';
    });
    
    listItem.addEventListener('mouseout', function() {
    deleteButton.style.display = 'none';
    });

    taskList.appendChild(listItem);
    saveToLocalStorage();
};

function saveToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
  
document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task);
        const checkBox = document.querySelector(`input[value="${task.text}"]`);
        if (checkBox) {
            checkBox.checked = task.completed;
            if (task.completed) {
                checkBox.nextElementSibling.style.color = "#266559";
            };
        };
    });
});