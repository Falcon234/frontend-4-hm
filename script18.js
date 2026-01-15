const API_URL = 'http://localhost:3000/students'; 


tr.innerHTML = `
<td>${student.id}</td>
<td>${student.name}</td>
<td>${student.age}</td>
<td>${student.course}</td>
<td>${student.skills.join(', ')}</td>
<td>${student.email}</td>
<td>${student.isEnrolled ? 'Так' : 'Ні'}</td>
<td>
<button onclick="updateStudent(${student.id})">Оновити</button>
<button onclick="deleteStudent(${student.id})">Видалити</button>
</td>
`;


tableBody.appendChild(tr);
});
}


async function addStudent(e) {
e.preventDefault();


const student = {
name: document.getElementById('name').value,
age: Number(document.getElementById('age').value),
course: document.getElementById('course').value,
skills: document.getElementById('skills').value.split(',').map(s => s.trim()),
email: document.getElementById('email').value,
isEnrolled: document.getElementById('isEnrolled').checked
};


try {
const res = await fetch(API_URL, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(student)
});


if (!res.ok) throw new Error('POST error');


form.reset();
getStudents();
} catch (error) {
console.error(error);
}
}


async function updateStudent(id) {
const newName = prompt('Нове імʼя:');
if (!newName) return;


try {
const res = await fetch(`${API_URL}/${id}`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name: newName })
});


if (!res.ok) throw new Error('PATCH error');


getStudents();
} catch (error) {
console.error(error);
}
}


async function deleteStudent(id) {
if (!confirm('Видалити студента?')) return;


try {
const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
if (!res.ok) throw new Error('DELETE error');
getStudents();
} catch (error) {
console.error(error);
}
}


getBtn.addEventListener('click', getStudents);
form.addEventListener('submit', addStudent);
