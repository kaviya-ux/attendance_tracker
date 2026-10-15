
let students = JSON.parse(localStorage.getItem("students")) || [];

let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

const nameInput = document.getElementById("studentName");
const dateInput = document.getElementById("attendanceDate");

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

dateInput.value = getToday();

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("attendance", JSON.stringify(attendance));
}

function addStudent() {
    const name = nameInput.value.trim();

    if (name === "") {
        document.getElementById("message").textContent =
            "Please enter a student name.";
        return;
    }

    const exists = students.some(function(student) {
        return student.name.toLowerCase() === name.toLowerCase();
    });

    if (exists) {
        document.getElementById("message").textContent =
            "This student already exists.";
        return;
    }

    students.push({
        id: Date.now(),
        name: name
    });

    nameInput.value = "";
    document.getElementById("message").textContent = "";

    saveData();
    displayStudents();
}

function markAttendance(id) {
    const date = dateInput.value;

    if (!attendance[date]) {
        attendance[date] = {};
    }

    const currentStatus = attendance[date][id];

    if (currentStatus === "Present") {
        attendance[date][id] = "Absent";
    } else {
        attendance[date][id] = "Present";
    }

    saveData();
    displayStudents();
}

function deleteStudent(id) {
    students = students.filter(function(student) {
        return student.id !== id;
    });

    saveData();
    displayStudents();
}

function displayStudents() {
    const list = document.getElementById("studentList");
    const date = dateInput.value;

    list.innerHTML = "";

    let presentCount = 0;
    let absentCount = 0;

    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        let status = "Not marked";

        if (attendance[date] && attendance[date][student.id]) {
            status = attendance[date][student.id];
        }

        if (status === "Present") {
            presentCount++;
        } else if (status === "Absent") {
            absentCount++;
        }

        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = i + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const statusCell = document.createElement("td");
        statusCell.textContent = status;

        const actionCell = document.createElement("td");

        const markButton = document.createElement("button");
        markButton.textContent = "Mark Attendance";
        markButton.className = "status-button " +
            (status === "Present" ? "present-button" :
            status === "Absent" ? "absent-button" : "");

        markButton.onclick = function() {
            markAttendance(student.id);
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.style.marginLeft = "5px";

        deleteButton.onclick = function() {
            deleteStudent(student.id);
        };

        actionCell.appendChild(markButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(numberCell);
        row.appendChild(nameCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        list.appendChild(row);
    }

    document.getElementById("total").textContent = students.length;
    document.getElementById("present").textContent = presentCount;
    document.getElementById("absent").textContent = absentCount;

    let percentage = 0;

    if (students.length > 0) {
        percentage = (presentCount / students.length) * 100;
    }

    document.getElementById("percentage").textContent =
        percentage.toFixed(1) + "%";
}

dateInput.addEventListener("change", displayStudents);

nameInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addStudent();
    }
});

displayStudents();
