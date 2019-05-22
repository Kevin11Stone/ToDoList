var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addBtn = document.querySelector("#create-item > button");
    addBtn.onclick = processNewItem;
    var readItemBtn = document.querySelector("#read-item > button");
    readItemBtn.onclick = readItem;
};
var itemKey = "todo";
function readItem() {
    var item = JSON.parse(localStorage.getItem(itemKey));
    alert("Title: " + item.title + "\n" + "Description: " + item.description);
    var array = [];
    array.push(item.title);
    console.log(array.join(", "));
}
function processNewItem() {
    var item = getItemFromForm();
    saveItem(item);
    notifyUser();
    clearForm();
    displayToDo(item);
}
function displayToDo(item) {
    var todoList = document.getElementById("todo-list");
    var itemPar = document.createElement("p");
    itemPar.innerText = item.title;
    itemPar.onclick = togggleItemComplete;
    itemPar.ondblclick = markComplete(item.title);
    itemPar.setAttribute("data-desc", item.description);
    todoList.appendChild(itemPar);
    var labelList = document.getElementById("notCompletedLabel");
    labelList.innerText = item.title + " = not done! \n Click on item to display details \n and mark as complete: ";
}
function togggleItemComplete() {
    var currItem = this;
    currItem.classList.toggle("completed");
    var title = currItem.innerText;
    var desc = currItem.getAttribute("data-desc");
    var labelList = document.getElementById("labelList");
    labelList.classList.toggle("completed");
    var clearLabel = document.getElementById("notCompletedLabel");
    clearLabel.classList.toggle("notCompleted");
    labelList.innerText = currItem.textContent + " = Completed!";
    var descriptionDiv = document.getElementById("descriptionDiv");
    descriptionDiv.innerText = title + " Details: \n" + desc;
    descriptionDiv.classList.toggle("completed");
}
function markComplete(titleOfTask) {
    var labelList = document.getElementById("labelList");
    if (labelList.innerText = titleOfTask + " = Completed!") {
        labelList.innerText = titleOfTask + " = Not Completed!";
    }
}
function notifyUser() {
}
function clearForm() {
    var textElements = document.querySelectorAll("input[type = text], textarea");
    for (var i = 0; i < textElements.length; i++) {
        textElements[i].value = "";
    }
    var isCompleteBox = document.querySelector("#is-complete");
    isCompleteBox.checked = false;
    var urgencyList = document.querySelector("#urgency");
    urgencyList.selectedIndex = 0;
}
function saveItem(item) {
    var data = JSON.stringify(item);
    console.log("Converting toDoItem into JSON string");
    console.log(data);
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(itemKey, data);
    }
}
function getItemFromForm() {
    var item = new ToDoItem();
    item.title = document.getElementById("title").value;
    item.description = document.getElementById("description").value;
    var itemStartDate = document.getElementById("start-date").value;
    item.startDate = new Date(itemStartDate);
    var itemEndDate = document.getElementById("end-date").value;
    item.endDate = new Date(itemEndDate);
    item.isComplete = document.getElementById("is-complete").checked;
    var urgencyElement = document.getElementById("urgency");
    item.urgency = urgencyElement.options[urgencyElement.selectedIndex].text;
    return item;
}
