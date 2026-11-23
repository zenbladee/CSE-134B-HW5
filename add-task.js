const TASKS = [
    "Finish HW 5 Part 1",
    "Finish HW 5 Part 2",
    "Finish HW 5 Part 3"
]

//Helper function used for attributeCHangedCallback
function updateSize(elem) {
    const taskSize = elem.getAttribute("size");
    if(taskSize === "large") {
        elem.style.fontSize = "1.75rem";
    }
    else {
        elem.style.fontSize = "1.15rem";
    }

}


class ToDo extends HTMLElement {
    static observedAttributes = ["size"]; 
    connectedCallback() {
        /* Heading */
        const taskHeading = document.createElement("h3");
        taskHeading.textContent = "My Tasks";

        /* Display the Item */
        const task = document.createElement("p"); //Make a task
        task.textContent = TASKS[0]; //Get the first task
        
        /* Control */
        const taskButton = document.createElement("button");
        taskButton.type = "button";
        taskButton.textContent = "Next Task";

        /* Status Message */
        const taskStatus = document.createElement("p");
        taskStatus.setAttribute("role", "status");
        taskStatus.textContent = `Task 1 of ${TASKS.length}`;

        let index = 0;
        //When the new task button is clicked, updates the task index and text content
        taskButton.addEventListener("click", () => {
            index = (index + 1) % TASKS.length; //Get Index of the Task
            task.textContent = TASKS[index]; //Gets content of the task
            taskStatus.textContent = `Task ${index + 1} of ${TASKS.length}`; //Shows task number
        });

        /* Add heading, task, butotn, and status to component */
        this.appendChild(taskHeading);
        this.appendChild(task);
        this.appendChild(taskButton);
        this.appendChild(taskStatus);
    }

    //update the component when the attribute changes
    attributeChangedCallback(name, oldValue, newValue){
        console.log(`Changed from ${oldValue} to ${newValue}`);
        updateSize(this);
    }
}

customElements.define("to-do", ToDo);

/* External Button */
const button = document.querySelector("#toggle-size");
const todo = document.querySelector("to-do");

button.addEventListener("click", () => {
    if(todo.getAttribute("size") === "large") {
        todo.setAttribute("size", "small");
    }
    else {
        todo.setAttribute("size", "large");
    }
});

