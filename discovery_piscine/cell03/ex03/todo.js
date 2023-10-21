function createNewTask() {
    const taskText = prompt("Enter a new task:");
    if (taskText === null) {
        return; // User clicked Cancel
    }

    if (taskText.trim() === "") {
        alert("Task cannot be empty.");
        return;
    }

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.textContent = taskText;

    // Add click event to remove task
    taskDiv.addEventListener("click", function () {
        const confirmRemove = confirm("Do you want to remove this task?");
        if (confirmRemove) {
            this.remove();
            saveTasksToCookies();
        }
    });

    // Add task to the top of the list
    const taskList = document.getElementById("ft_list");
    taskList.insertBefore(taskDiv, taskList.firstChild);

    saveTasksToCookies();
}

function saveTasksToCookies() {
    const tasks = [];
    const taskElements = document.querySelectorAll(".task");
    taskElements.forEach((taskElement) => {
        tasks.push(taskElement.textContent);
    });

    document.cookie = "tasks=" + JSON.stringify(tasks);
}

function loadTasksFromCookies() {
    const tasksCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("tasks="));

    if (tasksCookie) {
        const tasks = JSON.parse(tasksCookie.split("=")[1]);
        const taskList = document.getElementById("ft_list");

        tasks.forEach((taskText) => {
            const taskDiv = document.createElement("div");
            taskDiv.className = "task";
            taskDiv.textContent = taskText;

            // Add click event to remove task
            taskDiv.addEventListener("click", function () {
                const confirmRemove = confirm("Do you want to remove this task?");
                if (confirmRemove) {
                    this.remove();
                    saveTasksToCookies();
                }
            });

            // Add task to the top of the list
            taskList.insertBefore(taskDiv, taskList.firstChild);
        });
    }
}

// Load tasks from cookies when the page loads
loadTasksFromCookies();