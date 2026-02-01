let students = JSON.parse(localStorage.getItem("students")) || [];

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
  const roll = document.getElementById("roll").value;
  const name = document.getElementById("name").value;
  const dept = document.getElementById("dept").value;
  const marks = document.getElementById("marks").value;

  if (!roll || !name || !dept || !marks) {
    alert("Please fill all fields");
    return;
  }

  if (students.some(s => s.roll == roll)) {
    alert("Roll number already exists");
    return;
  }

  students.push({ roll, name, dept, marks: Number(marks) });
  saveData();
  render();
}

function render(data = students) {
  const body = document.getElementById("tableBody");
  body.innerHTML = "";

  data.forEach((s, i) => {
    body.innerHTML += `
      <tr>
        <td>${s.roll}</td>
        <td>${s.name}</td>
        <td>${s.dept}</td>
        <td>${s.marks}</td>
        <td>
          <button class="delete" onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>`;
  });

  updateDashboard();
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveData();
  render();
}

function searchStudent() {
  const key = document.getElementById("search").value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(key) ||
    s.dept.toLowerCase().includes(key) ||
    s.roll.toString().includes(key)
  );
  render(filtered);
}

function sortByMarks() {
  students.sort((a, b) => b.marks - a.marks);
  render();
}

function sortByName() {
  students.sort((a, b) => a.name.localeCompare(b.name));
  render();
}

function updateDashboard() {
  document.getElementById("total").innerText = students.length;

  if (students.length === 0) {
    document.getElementById("average").innerText = 0;
    document.getElementById("top").innerText = 0;
    return;
  }

  const totalMarks = students.reduce((sum, s) => sum + s.marks, 0);
  document.getElementById("average").innerText =
    (totalMarks / students.length).toFixed(1);

  document.getElementById("top").innerText =
    Math.max(...students.map(s => s.marks));
}

render();
