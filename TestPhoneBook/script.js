let data = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 }
];

function renderTable() {
    const table = document.getElementById("entries");
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
        </tr>
    `;

    data.forEach((entry, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.age}</td>
            <td>
                <button class="icon-button" onclick="editEntry(${index})"><span class="edit-icon"></span></button>
                <button class="icon-button" onclick="deleteEntry(${index})"><span class="delete-icon"></span></button>
            </td>
        `;
    });
}

function addEntry() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    if (name && age) {
        data.push({ name, age });
        renderTable();
    }
}

function editEntry(index) {
    const entry = data[index];
    document.getElementById("name").value = entry.name;
    document.getElementById("age").value = entry.age;
    // Store the index of the entry being edited for later update
    document.getElementById("editIndex").value = index;
}

function saveEdit() {
    const index = document.getElementById("editIndex").value;
    const newName = document.getElementById("name").value;
    const newAge = document.getElementById("age").value;
    if (newName && newAge) {
        data[index] = { name: newName, age: newAge };
        renderTable();
        // Clear input fields and edit index after saving
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("editIndex").value = "";
    }
}

function deleteEntry(index) {
    data.splice(index, 1);
    renderTable();
}

function searchEntries() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filteredData = data.filter(entry => entry.name.toLowerCase().includes(searchTerm) || entry.age.toString().includes(searchTerm));
    renderFilteredTable(filteredData);
}

function renderFilteredTable(filteredData) {
    const table = document.getElementById("entries");
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
        </tr>
    `;

    filteredData.forEach((entry, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.age}</td>
            <td>
                <button class="icon-button" onclick="editEntry(${index})"><span class="edit-icon"></span></button>
                <button class="icon-button" onclick="deleteEntry(${index})"><span class="delete-icon"></span></button>
            </td>
        `;
    });
}

// Initial rendering
renderTable();
