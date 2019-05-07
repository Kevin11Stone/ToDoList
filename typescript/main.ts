

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
}


function processNewItem() {
    let item:ToDoItem = getItemFromForm();
    saveItem(item);
    notifyUser();
    clearForm();
}


function notifyUser() {
    alert("Your item was successfully saved");
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
        localStorage.setItem("todo", data);
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