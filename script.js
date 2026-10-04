// Student array keeps app data in memory.
var students = [];

// Sample data for the empty state button.
var sampleStudents = [
  { name: 'Effa Divine', matric: '23/024145123', level: '300', department: 'Computer Science' },
  { name: 'Bassey Joy', matric: '23/024145124', level: '300', department: 'Accounting' },
  { name: 'Ikechukwu Emeka', matric: '23/024145125', level: '300', department: 'Mass Communication' }
];

// Simple refs to key elements.
var studentForm = document.getElementById('studentForm');
var countPill = document.getElementById('countPill');
var cardGrid = document.getElementById('cardGrid');
var namesList = document.getElementById('namesList');
var namesPanel = document.getElementById('namesPanel');
var emptyState = document.getElementById('emptyState');
var statusMessage = document.getElementById('statusMessage');
var removeLastBtn = document.getElementById('removeLastBtn');
var toggleNamesBtn = document.getElementById('toggleNamesBtn');
var addSamplesBtn = document.getElementById('addSamplesBtn');

// These are used by the validation messages.
var nameInput = document.getElementById('name');
var matricInput = document.getElementById('matric');
var levelInput = document.getElementById('level');
var departmentInput = document.getElementById('department');

var nameError = document.getElementById('nameError');
var matricError = document.getElementById('matricError');
var levelError = document.getElementById('levelError');
var departmentError = document.getElementById('departmentError');

// Add a new student after validation passes.
function addStudent(student) {
  students.push(student);
  render();
}

// Remove the newest student and tell the user who was removed.
function removeLast() {
  if (students.length === 0) {
    return;
  }

  var removedStudent = students.pop();
  statusMessage.textContent = 'Removed: ' + removedStudent.name;
  render();
}

// Check whether a matric number is already stored.
function matricExists(matricNumber) {
  var i = 0;

  while (i < students.length) {
    if (students[i].matric === matricNumber) {
      return true;
    }
    i += 1;
  }

  return false;
}

// Validate a single field or the whole form. Returns a boolean.
function validate() {
  var isValid = true;
  var nameValue = nameInput.value.trim();
  var matricValue = matricInput.value.trim();
  var levelValue = levelInput.value;
  var departmentValue = departmentInput.value.trim();

  nameError.textContent = '';
  matricError.textContent = '';
  levelError.textContent = '';
  departmentError.textContent = '';

  if (nameValue.length < 2) {
    nameError.textContent = 'Name must be at least 2 characters.';
    isValid = false;
  }

  if (matricValue === '') {
    matricError.textContent = 'Matric number is required.';
    isValid = false;
  } else if (!/^\d{2}\/\d{9}$/.test(matricValue)) {
    matricError.textContent = 'Use the format 23/024145123.';
    isValid = false;
  } else if (matricExists(matricValue)) {
    matricError.textContent = 'Matric number already exists.';
    isValid = false;
  }

  if (levelValue === '') {
    levelError.textContent = 'Please choose a level.';
    isValid = false;
  }

  if (departmentValue.length < 2) {
    departmentError.textContent = 'Department must be at least 2 characters.';
    isValid = false;
  }

  return isValid;
}

// Render student cards, names list, empty states, and button states.
function render() {
  var i = 0;

  countPill.textContent = students.length;

  // Empty state when no students have been added.
  if (students.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  // Remove old cards before drawing new ones.
  cardGrid.innerHTML = '';

  for (i = 0; i < students.length; i += 1) {
    var student = students[i];
    var card = document.createElement('article');
    var cardTop = document.createElement('div');
    var number = document.createElement('span');
    var levelBadge = document.createElement('span');
    var studentName = document.createElement('h3');
    var matricText = document.createElement('p');
    var departmentText = document.createElement('p');
    var tag = document.createElement('div');

    card.className = 'student-card';
    if (i === students.length - 1) {
      card.classList.add('last-added');
    }

    cardTop.className = 'card-top';
    number.className = 'card-number';
    number.textContent = '#' + (i + 1);

    levelBadge.className = 'level-badge';
    levelBadge.textContent = student.level + ' Level';

    studentName.textContent = student.name;
    matricText.className = 'matric';
    matricText.textContent = student.matric;
    departmentText.className = 'department';
    departmentText.textContent = student.department;

    tag.className = 'last-added-tag';
    tag.textContent = 'Last added';

    cardTop.appendChild(number);
    cardTop.appendChild(levelBadge);
    card.appendChild(cardTop);
    card.appendChild(studentName);
    card.appendChild(matricText);
    card.appendChild(departmentText);

    if (i === students.length - 1) {
      card.appendChild(tag);
    }

    cardGrid.appendChild(card);
  }

  // Toggle remove button state.
  if (students.length === 0) {
    removeLastBtn.disabled = true;
  } else {
    removeLastBtn.disabled = false;
  }

  // Show names only panel when needed.
  namesList.innerHTML = '';

  if (namesPanel.hidden === false) {
    if (students.length === 0) {
      var emptyText = document.createElement('p');
      emptyText.className = 'empty-list';
      emptyText.textContent = 'No student names to show yet.';
      namesList.appendChild(emptyText);
    } else {
      for (i = 0; i < students.length; i += 1) {
        var chip = document.createElement('span');
        chip.className = 'name-chip';
        chip.textContent = students[i].name;
        namesList.appendChild(chip);
      }
    }
  }
}

// Handle form submission.
studentForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!validate()) {
    return;
  }

  var student = {
    name: nameInput.value.trim(),
    matric: matricInput.value.trim(),
    level: levelInput.value,
    department: departmentInput.value.trim()
  };

  addStudent(student);
  statusMessage.textContent = 'Student added successfully.';
  studentForm.reset();
  nameInput.focus();
});

// Remove the newest student from the array.
removeLastBtn.addEventListener('click', function () {
  removeLast();
});

// Toggle names panel and display all names.
toggleNamesBtn.addEventListener('click', function () {
  if (namesPanel.hidden) {
    namesPanel.hidden = false;
    toggleNamesBtn.textContent = 'Hide names';
  } else {
    namesPanel.hidden = true;
    toggleNamesBtn.textContent = 'Done, show names';
  }

  render();
});

// Add the sample data when the empty state is used.
addSamplesBtn.addEventListener('click', function () {
  var j = 0;

  for (j = 0; j < sampleStudents.length; j += 1) {
    addStudent(sampleStudents[j]);
  }

  statusMessage.textContent = 'Sample students added.';
});

// Initial render for app startup.
render();
