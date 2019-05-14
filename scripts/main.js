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
    alert(item.title + " " + item.description);
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
    itemPar.setAttribute("data-desc", item.description);
    todoList.appendChild(itemPar);
}
function togggleItemComplete() {
    var currItem = this;
    currItem.classList.toggle("completed");
    var title = currItem.innerText;
    var desc = currItem.getAttribute("data-desc");
    alert("You completed " + title + ": " + desc);
}
function notifyUser() {
    alert("Your item was successfully saved");
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
