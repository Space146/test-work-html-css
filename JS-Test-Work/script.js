const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const btn = document.querySelector(".submitBtn");
const taskForm = document.getElementById("taskForm");

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTask = taskInput.value;
    if (newTask === '') {
        return alert('Нужно ввести что-то');
    } else if (newTask === ' ') {
        return alert('Просто пробел не считается');
    } else if (newTask === '  ') {
        return alert('не считается');
    } else if (newTask === '   ') {
        return alert('не считается');
    } else if (newTask === '    ') {
        return alert('не считается');
    } else if (newTask === '     ') {
        return alert('Серьезно?');
    };
    taskInput.value = '';
    // Здесь всегда isChecked будет false

    addTask(newTask);
});

// Метод должен принимать объект с полями value и isChecked
function addTask(task) {
    const listItem = document.createElement('li');

    const checkBox = document.createElement('input');
    checkBox.setAttribute("value", task);
    checkBox.setAttribute('type', 'checkbox');
    listItem.appendChild(checkBox);

    checkBox.addEventListener("change", function() {
        if (checkBox.checked) {
            taskText.style.color = "#266559";
        } else {
            taskText.style.color = "#FFFFFF";
        }
        saveToLocalStorage();
    });

    const taskText = document.createElement('span');
    taskText.textContent = task;
    listItem.appendChild(taskText);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("DltBtn");
    listItem.appendChild(deleteButton);
    
    taskList.appendChild(listItem);

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
        // Здесь будет task.completed
        addTask(task.text);
        const checkBox = document.querySelector('input[value="' + task.text + '"]');
        console.log(checkBox.checked, task);
        if (checkBox) {
            checkBox.checked = task.completed;
            if (task.completed) {
                checkBox.nextElementSibling.style.color = "#266559";
            }
        }
    });
});