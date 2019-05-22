

/**
 * Represents a single task in a ToDo List
 */
class ToDoItem {
    title:string;
    description:string;
    startDate:Date;
    endDate:Date;
    isComplete:boolean;
    urgency:string;
    //subTasks:Array<ToDoItem>;

}


/*
let testItem = new ToDoItem();
testItem.title = "Teach CPW 203"
testItem.description = "Lecture advanced JavaScript like a boss!";
// Date is an object
testItem.startDate = new Date("April 30th, 2019");
testItem.isComplete = false;
if (testItem.isComplete) {
    
}
*/

// when add item is clicked, get data off the page and 
    // wrap in ToDo object
    // notify user and clear form, save ToDo object

window.onload = function() {
    let addBtn = <HTMLElement>document.querySelector("#create-item > button");
    addBtn.onclick = processNewItem;

    // wire up Read Item button upon page download
    let readItemBtn = <HTMLElement>document.querySelector("#read-item > button");
    readItemBtn.onclick = readItem;
}



const itemKey:string = "todo";
function readItem() {
    // get item from storage and then display it
    // read string and determine if it is of JSON format
    
    let item:ToDoItem = JSON.parse(localStorage.getItem(itemKey));
    alert("Title: " + item.title + "\n" + "Description: " + item.description);

    let array:string[] =[];
    array.push(item.title);
    console.log(array.join(", "));
}



function processNewItem() {
    let item:ToDoItem = getItemFromForm();
    saveItem(item);
    notifyUser();
    clearForm();
    displayToDo(item);

}


function displayToDo(item:ToDoItem) {
    let todoList = document.getElementById("todo-list");
   
    // create <p> element and inject title
    let itemPar = document.createElement("p");
    itemPar.innerText = item.title;
    itemPar.onclick = togggleItemComplete;
    itemPar.ondblclick = markComplete(item.title);
    // set custom attribute
    itemPar.setAttribute("data-desc", item.description);


    // add <p> (itemPar) to <div> element
    todoList.appendChild(itemPar);

    let labelList = document.getElementById("notCompletedLabel");
    labelList.innerText = item.title + " = not done! \n Click on item to display details \n and mark as complete: "

    
}



function togggleItemComplete() {
    let currItem:HTMLElement = this;
    // need to create "completed" CSS class  
    currItem.classList.toggle("completed");

    let title = currItem.innerText;
    // grab custom attribute from displayToDo function above
    let desc = currItem.getAttribute("data-desc");

    let labelList = document.getElementById("labelList");
    labelList.classList.toggle("completed");

    let clearLabel = document.getElementById("notCompletedLabel");
    clearLabel.classList.toggle("notCompleted");



    labelList.innerText = currItem.textContent + " = Completed!"

    let descriptionDiv = document.getElementById("descriptionDiv");
    descriptionDiv.innerText = title + " Details: \n" + desc;
    descriptionDiv.classList.toggle("completed");
  
    //descriptionDiv.innerText = title + "\n Not Completed!";
    //alert("You completed " + title + ": " + desc);
}



function  markComplete(titleOfTask:string):any {
    let labelList= document.getElementById("labelList");
    
    if (labelList.innerText = titleOfTask + " = Completed!" ) {
        labelList.innerText = titleOfTask + " = Not Completed!"
        
    }
    
}






/**
 * Displays an alert to user
 */
function notifyUser() {
    //alert("Your item was successfully saved");
}



function clearForm() {
    // We could wrap all inputs in a <form> tag and reset the form, but we're 
    // practicing Javascript

    // clear all textboxes and set to empty string
    let textElements = document.querySelectorAll("input[type = text], textarea");
    for (let i = 0; i < textElements.length; i++) {
        // cast to input element to grab the value property
        (<HTMLInputElement>textElements[i]).value = "";
    }     
    // uncheck is complete
    let isCompleteBox = <HTMLInputElement>document.querySelector("#is-complete");
    // access check property and set to false
    isCompleteBox.checked = false;

    // reset select list
    let urgencyList = (<HTMLSelectElement>document.querySelector("#urgency"));
    urgencyList.selectedIndex = 0;


}






function saveItem(item:ToDoItem):void {

    // stringify(an object) in this case our item
    let data:string = JSON.stringify(item);
    console.log("Converting toDoItem into JSON string")
    console.log(data);


    // ensure user can use local storage
    if(typeof(Storage) !== "undefined") {
        localStorage.setItem(itemKey, data);
    }


}




/**
 * Get all user input from Form and wrap it in a ToDo item
 */
function getItemFromForm():ToDoItem {
    let item =new ToDoItem();

    item.title = (<HTMLInputElement>document.getElementById("title")).value;
    item.description = (<HTMLTextAreaElement>document.getElementById("description")).value;

    let itemStartDate:string = (<HTMLInputElement>document.getElementById("start-date")).value;
    item.startDate = new Date ( itemStartDate );

    let itemEndDate:string = (<HTMLInputElement>document.getElementById("end-date")).value;
    item.endDate = new Date ( itemEndDate );

    item.isComplete = (<HTMLInputElement>document.getElementById("is-complete")).checked;

    let urgencyElement = <HTMLSelectElement>document.getElementById("urgency");
    item.urgency = urgencyElement.options[urgencyElement.selectedIndex].text;

    return item;


}