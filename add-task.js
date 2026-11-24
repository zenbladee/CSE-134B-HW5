const FACT_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

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
        taskHeading.textContent = "Useless Facts";

        /* Display the Item */
        const task = document.createElement("p"); //Make a task
        task.textContent = "Get A Random Useless Fact"; 
        
        /* Control */
        const taskButton = document.createElement("button");
        taskButton.type = "button";
        taskButton.textContent = "New Fact";

        /* Status Message */
        const taskStatus = document.createElement("p");
        taskStatus.setAttribute("role", "status");
        taskStatus.textContent = "Awaiting New Fact";

        //When the new fact button is clicked, get a new fact
        taskButton.addEventListener("click", async () => {
            taskButton.disabled = true; //No Spam
            taskStatus.textContent = "Loading Fact"
            
            try {
                //Send a GET request for the URL
                const response = await fetch(FACT_URL);

                if(!response.ok) {
                    //pass the status code to the catch block
                    throw new Error(`HTTP status ${response.status}`);
                }

                //Read the response body and parse into a JavaScript value
                const data  = await response.json();
                
                //Check that the fact is text
                if (typeof data?. text !== "string") {
                    throw new Error("Expected a fact in the resposne.");
                }

                task.textContent = data.text; //get the fact
                taskStatus.textContent = "Fact Loaded.";
            }

            catch (error) {
                console.error("Could not get the fact", error);
                taskStatus.textContent = "Could not retrieve a random useless fact.";
            }

            //Can click again
            taskButton.disabled = false;
        });

        /* Add heading, task, butotn, and status to component */
        this.appendChild(taskHeading);
        this.appendChild(task);
        this.appendChild(taskButton);
        this.appendChild(taskStatus);
    }

    //update the component when the attribute changes
    attributeChangedCallback(name, oldValue, newValue){
        console.log(`Changed ${name} from ${oldValue} to ${newValue}`);
        updateSize(this);
    }
}

customElements.define("to-do", ToDo);

/* External Button */
const SIZE_KEY = "hw5-todo-size";
const button = document.querySelector("#toggle-size");
const todo = document.querySelector("to-do");

//Restored choice is retrieved
let savedSize = null;
try {
    savedSize = localStorage.getItem(SIZE_KEY);
}
catch (error) {
    console.error("Could not retrieve the saved size data", error);
}

//Set the size to savedSize
if(savedSize === "large" || savedSize === "small") {
    todo.setAttribute("size", savedSize);
}
else {
    //Small is the default size
    todo.setAttribute("size", "small"); 
}

//When clickedd change the size to the opposite of waht it was 
button.addEventListener("click", () => {
    let next = "large";
    //Get the opposite
    if (todo.getAttribute("size") === "large") {
        next = "small";
    }

    //Set the opposite size
    todo.setAttribute("size", next); 

    //Try to save the choice to survive if the page is reloaded
    try {
        localStorage.setItem(SIZE_KEY, next);
    } catch(error) {
        console.error("Could not save the size.", error);
    }
});

