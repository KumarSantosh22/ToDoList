add = document.getElementById("add");

function getAndUpdate() {
  console.log("Updating List...");
  tit = document.getElementById("title").value;
  desc = document.getElementById("description").value;
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }
  update();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }

  // Populate the table
  tbody = document.getElementById("tableBody");
  let string = "";
  itemJsonArray.forEach((element, index) => {
    string += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button id="todo-${
              index + 1
            }"  onclick="deleted(${index})" class="btn btn-sm btn-danger">X</button></td>
            </tr>
        `;
  });
  tbody.innerHTML = string;
}

add.addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex) {
  console.log("Deleted", itemIndex);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  // Delete item from local storage
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

function clearStorage() {
  if (confirm("Are you sure you want to clear the whole lis?")) {
    console.log("clicked...");
    localStorage.removeItem("itemsJson");
    update();
  }
}
