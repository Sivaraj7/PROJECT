let tasks = [];
let currentFilter = 'all';

// CREATE
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  
  if (!taskText) {
    alert("Please enter a valid task!");
    return;
  }

  tasks.push({
    id: Date.now(),
    text: taskText,
    completed: false
  });
  
  input.value = "";
  displayTasks();
}

// READ (with filter)
function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    return currentFilter === 'all' ? true : task.completed;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    
    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleCompleted(task.id);

    // Task Text
    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = task.completed ? "completed" : "";

    // Update Button
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "✏️";
    updateBtn.onclick = () => initUpdateTask(task.id, span);

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(updateBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// UPDATE
function initUpdateTask(id, spanElement) {
  const task = tasks.find(task => task.id === id);
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "💾";
  saveBtn.onclick = () => saveUpdatedTask(id, input.value);

  const li = spanElement.parentElement;
  li.replaceChild(input, spanElement);
  li.insertBefore(saveBtn, li.children[2]);
}

function saveUpdatedTask(id, newText) {
  tasks = tasks.map(task => 
    task.id === id ? {...task, text: newText.trim()} : task
  );
  displayTasks();
}

// DELETE
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

// Toggle Completion
function toggleCompleted(id) {
  tasks = tasks.map(task => 
    task.id === id ? {...task, completed: !task.completed} : task
  );
  displayTasks();
}

// Filter Control
function filterTasks(filterType) {
  currentFilter = filterType;
  displayTasks();
}
