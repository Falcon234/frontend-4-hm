const API_URL = 'http://localhost:3000/students';

const getBtn = document.getElementById('get-students-btn');
const tableBody = document.querySelector('#students-table tbody');
const form = document.getElementById('add-student-form');


async function getStudents() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }

    const students = await response.json();
    renderStudents(students);
  } catch (error) {
    console.error('GET error:', error);
  }
}


function renderStudents(students) {
  tableBody.innerHTML = '';

  students.forEach(student => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(', ')}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? 'Так' : 'Ні'}</td>
      <td>
        <button type="button" onclick="updateStudent(${student.id})">Оновити</button>
        <button type="button" onclick="deleteStudent(${student.id})">Видалити</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}


async function addStudent(event) {
  event.preventDefault();

  const newStudent = {
    name: document.getElementById('name').value.trim(),
    age: Number(document.getElementById('age').value),
    course: document.getElementById('course').value.trim(),
    skills: document.getElementById('skills').value
      .split(',')
      .map(skill => skill.trim()),
    email: document.getElementById('email').value.trim(),
    isEnrolled: document.getElementById('isEnrolled').checked
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    });

    if (!response.ok) {
      throw new Error('Failed to add student');
    }

    form.reset();
    await getStudents();
  } catch (error) {
    console.error('POST error:', error);
  }
}


async function updateStudent(id) {
  const updatedName = prompt('Введіть нове імʼя студента');
  if (!updatedName) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: updatedName })
    });

    if (!response.ok) {
      throw new Error('Failed to update student');
    }

    await getStudents();
  } catch (error) {
    console.error('PATCH error:', error);
  }
}


async function deleteStudent(id) {
  const isConfirmed = confirm('Ви впевнені, що хочете видалити студента?');
  if (!isConfirmed) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete student');
    }

    await getStudents();
  } catch (error) {
    console.error('DELETE error:', error);
  }
}


getBtn.addEventListener('click', getStudents);
form.addEventListener('submit', addStudent);
