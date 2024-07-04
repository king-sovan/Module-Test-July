fetch("students.json")
  .then((response) => response.json())
  .then((data) => {
    window.students = data;
    displayStudents(data);
  });

function displayStudents(students) {
  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";
  students.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><img src=${student.img_src} alt="Image of ${student.first_name} ${
      student.last_name
    }"> ${student.first_name} ${student.last_name}</td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? "Passing" : "Failed"}</td>
      <td>${student.email}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("search").addEventListener("input", handleSearch);
document.getElementById("searchButton").addEventListener("click", handleSearch);

function handleSearch() {
  const query = document.getElementById("search").value.toLowerCase();
  const filteredStudents = window.students.filter((student) => {
    return (
      student.first_name.toLowerCase().includes(query) ||
      student.last_name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });
  displayStudents(filteredStudents);
}

document
  .getElementById("sortAZ")
  .addEventListener("click", () => sortStudents("az"));
document
  .getElementById("sortZA")
  .addEventListener("click", () => sortStudents("za"));
document
  .getElementById("sortMarks")
  .addEventListener("click", () => sortStudents("marks"));
document
  .getElementById("sortPassing")
  .addEventListener("click", () => sortStudents("passing"));
document
  .getElementById("sortClass")
  .addEventListener("click", () => sortStudents("class"));
document
  .getElementById("sortGender")
  .addEventListener("click", () => sortStudents("gender"));

function sortStudents(criteria) {
  let sortedStudents;
  switch (criteria) {
    case "az":
      sortedStudents = [...window.students].sort((a, b) =>
        `${a.first_name} ${a.last_name}`.localeCompare(
          `${b.first_name} ${b.last_name}`
        )
      );
      break;
    case "za":
      sortedStudents = [...window.students].sort((a, b) =>
        `${b.first_name} ${b.last_name}`.localeCompare(
          `${a.first_name} ${a.last_name}`
        )
      );
      break;
    case "marks":
      sortedStudents = [...window.students].sort((a, b) => a.marks - b.marks);
      break;
    case "passing":
      sortedStudents = window.students.filter((student) => student.passing);
      break;
    case "class":
      sortedStudents = [...window.students].sort((a, b) => a.class - b.class);
      break;
    case "gender":
      const males = window.students.filter(
        (student) => student.gender.toLowerCase() === "male"
      );
      const females = window.students.filter(
        (student) => student.gender.toLowerCase() === "female"
      );
      displayGenderTables(males, females);
      return;
  }
  displayStudents(sortedStudents);
}

function displayGenderTables(males, females) {
  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";

  const maleHeading = document.createElement("tr");
  maleHeading.innerHTML = '<th colspan="7">Male Students</th>';
  tbody.appendChild(maleHeading);
  males.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><img src="${student.img_src}" alt="Image of ${student.first_name} ${
      student.last_name
    }"> ${student.first_name} ${student.last_name}</td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? "Passing" : "Failed"}</td>
      <td>${student.email}</td>
    `;
    tbody.appendChild(tr);
  });

  const femaleHeading = document.createElement("tr");
  femaleHeading.innerHTML = '<th colspan="7">Female Students</th>';
  tbody.appendChild(femaleHeading);
  females.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><img src="${student.img_src}" alt="Image of ${student.first_name} ${
      student.last_name
    }"> ${student.first_name} ${student.last_name}</td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? "Passing" : "Failed"}</td>
      <td>${student.email}</td>
    `;
    tbody.appendChild(tr);
  });
}
