interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const taskInput = document.getElementById("task-input") as HTMLInputElement;
const addTaskButton = document.getElementById(
    "add-task-button"
) as HTMLButtonElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
console.log(taskInput);
console.log(addTaskButton);
console.log(taskList);

let tasks: Task[] = [];

function addTask(title: string): void {
    const newTask: Task = {
        id: Date.now(),
        title,
        completed: false,
    };
    tasks.push(newTask);

    renderTasks();
}

function toggleTaskCompletion(taskId: number): void {
    tasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    renderTasks();
}

function deleteTask(taskId: number): void {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
}

function renderTasks(): void {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            toggleTaskCompletion(task.id);
        });

        const span = document.createElement("span");
        span.textContent = task.title;
        if (task.completed) {
            span.classList.add("completed");
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

addTaskButton.addEventListener("click", () => {
    const title = taskInput.value.trim();
    if (title) {
        addTask(title);
        taskInput.value = "";
    }
});

renderTasks();
