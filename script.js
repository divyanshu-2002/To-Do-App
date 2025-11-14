// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    createTaskElement(taskText);
    saveTask(taskText);

    input.value = "";
}

// Create task item UI
function createTaskElement(text, completed = false) {
    let ul = document.getElementById("taskList");
    let li = document.createElement("li");

    if (completed) li.classList.add("completed");

    li.innerHTML = `
        <span>${text}</span>
        <div class="actions">
            <button class="btn-complete">✔</button>
            <button class="btn-delete">✖</button>
        </div>
    `;

    ul.appendChild(li);

    // Complete Task
    li.querySelector(".btn-complete").addEventListener("click", () => {
        li.classList.toggle("completed");
        updateStorage();
    });

    // Delete Task
    li.querySelector(".btn-delete").addEventListener("click", () => {
        li.remove();
        updateStorage();
    });
}

// Save tasks to localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update localStorage after actions
function updateStorage() {
    let allTasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        allTasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => createTaskElement(t.text, t.completed));
}
