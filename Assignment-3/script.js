// Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () { 
  return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

// DOM Ready handler
document.addEventListener('DOMContentLoaded', function() {
  // Populate social media icons
  const nav = document.querySelector('.socialmediaicons');
  const heading = document.createElement('h1');
  heading.textContent = t.getName();
  nav.appendChild(heading);

  const ul = document.createElement('ul');
  for (let platform in socialMedia) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = socialMedia[platform];
    const img = document.createElement('img');
    img.src = `images/${platform}.png`;
    img.alt = platform;
    a.appendChild(img);
    li.appendChild(a);
    ul.appendChild(li);
  }
  nav.appendChild(ul);

  // Table functionality
  const table = document.getElementById('myTable');
  const submitButton = document.getElementById('button');
  const addButton = document.getElementById('add');
  const editModal = document.getElementById('editModal');
  
  // Initially hide dropdowns and disable submit button
  document.querySelectorAll('.dropDownTextArea').forEach(row => {
    row.style.display = 'none';
  });
  submitButton.disabled = true;
  submitButton.style.backgroundColor = '#cccccc';

  // Checkbox functionality
  table.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
      const row = e.target.closest('tr');
      if (row) {
        if (e.target.checked) {
          // Selection behavior
          row.style.backgroundColor = 'yellow';
          submitButton.style.backgroundColor = 'orange';
          submitButton.disabled = false;
          
          // Add Edit button
          const editCell = row.cells[row.cells.length - 2];
          if (!editCell.querySelector('button')) {
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => openEditModal(row);
            editCell.appendChild(editButton);
          }

          // Add Delete button
          const deleteCell = row.cells[row.cells.length - 1];
          if (!deleteCell.querySelector('button')) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteCell.appendChild(deleteButton);
          }
        } else {
          // Deselection behavior
          row.style.backgroundColor = 'white'; // Explicitly set to white
          
          // Remove Edit button
          const editCell = row.cells[row.cells.length - 2];
          const editButton = editCell.querySelector('button');
          if (editButton) {
            editCell.removeChild(editButton);
          }

          // Remove Delete button
          const deleteCell = row.cells[row.cells.length - 1];
          const deleteButton = deleteCell.querySelector('button');
          if (deleteButton) {
            deleteCell.removeChild(deleteButton);
          }

          // Check if any checkboxes are still selected
          const checkedBoxes = table.querySelectorAll('input[type="checkbox"]:checked');
          if (checkedBoxes.length === 0) {
            submitButton.disabled = true;
            submitButton.style.backgroundColor = '#cccccc';
          }
        }
      }
    }
  });

  // Arrow toggle functionality
  table.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' && e.target.src.includes('down.png')) {
      const row = e.target.closest('tr');
      const dropDownRow = row.nextElementSibling;
      if (dropDownRow && dropDownRow.classList.contains('dropDownTextArea')) {
        // Toggle the dropdown visibility
        const isHidden = dropDownRow.style.display === 'none';
        dropDownRow.style.display = isHidden ? 'table-row' : 'none';
        
        // Rotate the arrow image based on state
        e.target.style.transform = isHidden ? 'rotate(180deg)' : '';
        e.target.style.transition = 'transform 0.3s ease';
      }
    }
  });

  // Delete functionality
  table.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Delete') {
      const row = e.target.closest('tr');
      const studentName = row.cells[1].textContent;
      const dropDownRow = row.nextElementSibling;
      if (confirm('Are you sure you want to delete this record?')) {
        if (dropDownRow && dropDownRow.classList.contains('dropDownTextArea')) {
          dropDownRow.remove();
        }
        row.remove();
        alert(`${studentName} Record deleted successfully`);
        
        // Check if any checkboxes are still selected after deletion
        const checkedBoxes = table.querySelectorAll('input[type="checkbox"]:checked');
        if (checkedBoxes.length === 0) {
          submitButton.disabled = true;
          submitButton.style.backgroundColor = '#cccccc';
        }
      }
    }
  });

  // Add new student functionality
  let studentCount = 3;
  addButton.addEventListener('click', function() {
    try {
      studentCount++;
      const newRow = table.insertRow(-1);
      newRow.innerHTML = `
        <td><input type="checkbox" /><br /><br /><img src="down.png" width="25px" /></td>
        <td>Student ${studentCount}</td>
        <td>Teacher ${studentCount}</td>
        <td>Pending</td>
        <td>Fall</td>
        <td>TA</td>
        <td>${40000 + studentCount}</td>
        <td>100%</td>
        <td></td>
        <td></td>
      `;

      const dropDownRow = table.insertRow(-1);
      dropDownRow.className = 'dropDownTextArea';
      dropDownRow.style.display = 'none';
      dropDownRow.innerHTML = `
        <td colspan="10">
          Advisor:<br /><br />
          Award Details<br />
          Summer 1-2014(TA)<br />
          Budget Number: <br />
          Tuition Number: <br />
          Comments:<br /><br /><br />
          Award Status:<br /><br /><br />
        </td>
      `;

      alert(`Student ${studentCount} Record added successfully`);
    } catch (error) {
      alert('Error adding new student record: ' + error.message);
    }
  });
});

// Edit Modal Functions
function openEditModal(row) {
  const modal = document.getElementById('editModal');
  const modalTitle = modal.querySelector('.modal-title');
  const studentDetails = modal.querySelector('.student-details');
  const studentName = row.cells[1].textContent;
  
  modalTitle.textContent = `Edit details of ${studentName}`;
  
  // Populate student details
  studentDetails.innerHTML = `
    <p><strong>Student:</strong> ${row.cells[1].textContent}</p>
    <p><strong>Advisor:</strong> ${row.cells[2].textContent}</p>
    <p><strong>Award Status:</strong> ${row.cells[3].textContent}</p>
    <p><strong>Semester:</strong> ${row.cells[4].textContent}</p>
    <p><strong>Type:</strong> ${row.cells[5].textContent}</p>
    <p><strong>Budget #:</strong> ${row.cells[6].textContent}</p>
    <p><strong>Percentage:</strong> ${row.cells[7].textContent}</p>
  `;
  
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('editModal');
  modal.style.display = 'none';
}

function updateStudent() {
  const studentName = document.querySelector('.modal-title').textContent.split('of ')[1];
  alert(`${studentName} data updated successfully`);
  closeModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('editModal');
  if (event.target === modal) {
    closeModal();
  }
}