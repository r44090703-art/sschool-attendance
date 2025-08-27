let students = JSON.parse(localStorage.getItem("students")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || []; 
// {name, date, status}

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
  localStorage.setItem("attendance", JSON.stringify(attendance));
}

function renderStudents() {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";
  students.forEach((student, index) => {
    let row = `
      <tr>
        <td>${student}</td>
        <td>-</td>
        <td>
          <button onclick="markAttendance(${index}, 'Present')">Present</button>
          <button onclick="markAttendance(${index}, 'Absent')">Absent</button>
		  <button onclick="markAttendance(${index}, 'Leave')">Leave</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

function renderRecords() {
  const table = document.getElementById("recordTable");
  table.innerHTML = "";
  attendance.forEach(record => {
    let row = `
      <tr>
        <td>${record.name}</td>
        <td>${record.date}</td>
        <td>${record.status}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

function addStudent() {
  const name = document.getElementById("studentName").value;
  if(name.trim() === "") return alert("Enter a name!");
  students.push(name);
  saveData();
  renderStudents();
  document.getElementById("studentName").value = "";
}

function markAttendance(index, status) {
  const date = document.getElementById("date").value;
  if(!date) return alert("Please select a date!");

  const student = students[index];

  // prevent duplicate entries for same student/date
  const exists = attendance.find(r => r.name === student && r.date === date);
  if(exists) {
    exists.status = status; // update if already marked
  } else {
    attendance.push({ name: student, date: date, status: status });
  }

  saveData();
  renderRecords();
}

// ✅ Export to CSV (Excel readable)
function exportCSV() {
  if(attendance.length === 0) {
    alert("No attendance records to export!");
    return;
  }

  let csv = "Name,Date,Status\n";
  attendance.forEach(record => {
    csv += `${record.name},${record.date},${record.status}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "attendance_records.csv";
  link.click();
}

renderStudents();
renderRecords();
