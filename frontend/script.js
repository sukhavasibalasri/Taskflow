const API = "http://localhost:8080/api";


// =========================
// REGISTER
// =========================

async function register() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(
        `${API}/auth/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (response.ok) {

        document.getElementById("message")
            .innerText = "Registration successful!";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);

    } else {

        document.getElementById("message")
            .innerText = "Registration failed.";

        console.log(data);
    }
}


// =========================
// LOGIN
// =========================

async function login() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const response = await fetch(
        `${API}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );

    if (!response.ok) {

        document.getElementById("message")
            .innerText = "Invalid email or password.";

        return;
    }

    const user = await response.json();

    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);

    window.location.href = "dashboard.html";
}


// =========================
// ADD TASK
// =========================

async function addTask() {

    const userId =
        localStorage.getItem("userId");

    if (!userId) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const title =
        document.getElementById("title").value;

    const description =
        document.getElementById("description").value;

    const priority =
        document.getElementById("priority").value;

    if (!title.trim()) {
        alert("Please enter a task title.");
        return;
    }

    const response = await fetch(
        `${API}/tasks/${userId}`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                description,
                priority
            })
        }
    );

    if (!response.ok) {
        alert("Failed to add task.");
        return;
    }

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    loadTasks();
}


// =========================
// GET TASKS
// =========================

async function loadTasks() {

    const userId =
        localStorage.getItem("userId");

    if (!userId) {
        return;
    }

    const taskList =
        document.getElementById("taskList");

    if (!taskList) {
        return;
    }

    const response = await fetch(
        `${API}/tasks/${userId}`
    );

    const tasks =
        await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const div =
            document.createElement("div");

        div.className = "task";

        div.innerHTML = `

            <h3>${task.title}</h3>

            <p>
                ${task.description || ""}
            </p>

            <p>
                Priority:
                <b>${task.priority}</b>
            </p>

            <p>
                Status:
                <b>${task.status}</b>
            </p>

            <button
                onclick="completeTask(${task.id})">
                Complete
            </button>

            <button
                onclick="deleteTask(${task.id})">
                Delete
            </button>

        `;

        taskList.appendChild(div);
    });
}


// =========================
// COMPLETE TASK
// =========================

async function completeTask(id) {

    const response =
        await fetch(
            `${API}/tasks/single/${id}`
        );

    if (!response.ok) {
        alert("Task not found.");
        return;
    }

    const task =
        await response.json();

    task.status = "COMPLETED";

    await fetch(
        `${API}/tasks/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: "COMPLETED"
            })
        }
    );

    loadTasks();
}


// =========================
// DELETE TASK
// =========================

async function deleteTask(id) {

    const confirmed =
        confirm("Are you sure you want to delete this task?");

    if (!confirmed) {
        return;
    }

    await fetch(
        `${API}/tasks/${id}`,
        {
            method: "DELETE"
        }
    );

    loadTasks();
}


// =========================
// LOGOUT
// =========================

function logout() {

    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    window.location.href = "login.html";
}


// =========================
// SHOW USER NAME
// =========================

function showUserName() {

    const userName =
        localStorage.getItem("userName");

    const welcomeUser =
        document.getElementById("welcomeUser");

    if (welcomeUser && userName) {

        welcomeUser.innerText =
            "Welcome, " + userName;

    }
}


// =========================
// PAGE LOAD
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        showUserName();

        loadTasks();

    }
);