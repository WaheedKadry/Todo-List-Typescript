let input = document.querySelector(".input") as HTMLInputElement;
let tasksDiv = document.querySelector(".tasks") as HTMLDivElement;
type Task = {
  id: number | string;
  title?: string | number;
  completed: boolean;
  createdAt: string;
};
let tasks: Task[] = [];
getTasksToLocalstorage();
let deleteAll = document.createElement("div");
deleteAll.classList.add("del-all");
deleteAll.appendChild(document.createTextNode("Delete All Tasks"));
document.body.appendChild(deleteAll);
deleteAll.style.display = "none";
deleteAll.addEventListener("click", () => {
  tasks = [];
  tasksDiv.innerHTML = "";
  localStorage.removeItem("Tasks");
  deleteAll.style.display = "none";
});
if (tasks.length > 0) deleteAll.style.display = "block";
document.querySelector<HTMLFormElement>(".form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" && input.value == null) return;
  if (input.value !== "") {
    addTaskToArray(input?.value);
    addTaskToPageFrom(tasks);
    addTasksToLocalstorage(tasks);
    input.value = "";
    input.focus();
  }
});
function addTaskToArray(taskText: string) {
  let task: Task = {
    id: Math.random() * Math.random(),
    title: taskText,
    completed: false,
    createdAt: `${new Date().toLocaleTimeString()} At ${new Date().toLocaleDateString()}`,
  };
  tasks.push(task);
  deleteAll.style.display = "block";
}
function addTaskToPageFrom(tasks: Task[]): void {
  tasksDiv.innerHTML = "";
  tasks.forEach((e: any) => {
    let task = document.createElement("div");
    task.classList.add("task");
    task.setAttribute("data-id", e.id);
    task.appendChild(document.createTextNode(e.title));
    let dateTask = document.createElement("span");
    dateTask.classList.add("task-date");
    dateTask.appendChild(document.createTextNode(e.createdAt));
    task.appendChild(dateTask);
    let deleteBtn = document.createElement("span");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    task.appendChild(deleteBtn);
    tasksDiv.appendChild(task);
    e.completed ? task.classList.add("done") : task.classList.remove("done");
  });
}
function addTasksToLocalstorage(tasks: Task[]): void {
  localStorage.setItem("Tasks", JSON.stringify(tasks));
}
function getTasksToLocalstorage(): void {
  if (localStorage.Tasks) {
    tasks = JSON.parse(localStorage.Tasks);
  }
  addTaskToPageFrom(tasks);
}
tasksDiv.addEventListener("click", function (e: any) {
  if (e.target.classList.contains("deleteBtn")) {
    let id = e.target.parentElement.dataset.id;
    tasks = JSON.parse(localStorage.Tasks).filter((e: any) => e.id != id);
    addTasksToLocalstorage(tasks);
    getTasksToLocalstorage();
    e.target.parentElement.remove();
    if (tasks.length == 0) deleteAll.style.display = "none";
    if (JSON.parse(localStorage.Tasks).length == 0)
      localStorage.removeItem("Tasks");
  }
  e.target.classList.contains("task") && e.target.classList.toggle("done");
});