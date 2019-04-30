

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
