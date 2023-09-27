const itemsList = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
const inputTask = document.querySelector(".inputTask");

const getDate = () => {
    let date = new Date();
    date = date.toString().split(" ");
    document.querySelector(".date").innerText = date[1] + " "+ date[2] + " " +date[3];
}

const createTask = (inputTask) => {
    if(inputTask.value.trim() !== ""){
        itemsList.push(inputTask.value);
        reload();
    }
}

const showTask = () => {
    let items = "";
     for(let i = 0; i < itemsList.length; i++){
        items += `<div class="list">
                    <input type="checkbox" name="" id="checkbox">
                    <textarea class= "textEdit" disabled>${itemsList[i]}</textarea>
                    <div class="icon">
                    <i class="fas fa-edit edit"></i>
                    <i class="fas fa-trash delete"></i>
                    <div class="confirm">
                        <button type="button" class="btn btn-danger cancel"><i class="fas fa-ban"></i></button>
                        <button type="button" class="btn btn-success save"><i class="fas fa-check"></i></button>
                    </div>
                </div>
            </div>`;
    }
    document.querySelector(".todo-list").innerHTML = items;
    activateDelete();
    activateEdit();
    activateSave();
    activateCancel();
}

const activateDelete = () => {
    document.querySelectorAll(".delete").forEach((btn, i) =>{
        btn.addEventListener("click", () => { deleteTask(i) });
    });
}

const activateEdit = () => {
    document.querySelectorAll(".edit").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".confirm")[i].style.display = "block";
            document.querySelectorAll(".textEdit")[i].disabled = false;

        });
    });
}

const activateSave = () => {
    document.querySelectorAll(".save").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            updateItem(textArea[i].value , i);
        })
    })
}

const activateCancel = () => {
    document.querySelectorAll(".cancel").forEach((btn, i) => {
        btn.addEventListener("click", () =>{
            document.querySelectorAll(".confirm")[i].style.display = "none";
            document.querySelectorAll(".textEdit")[i].disabled = true;
            reload();
        })
    })
}

const updateItem = (newValue, i) => {
    if(newValue.trim() !== ""){
        itemsList[i] = newValue;
        reload();
    }
    else {
        alert("Please enter a value");
    }
}

const deleteTask = (i) => {
    itemsList.splice(i, 1);
    reload();
}

const reload = () => {
    localStorage.setItem("items", JSON.stringify(itemsList));
    location.reload(); 
}

document.querySelector(".addTask").addEventListener("click", () => {
        createTask(inputTask);
});


window.onload = () => {
    inputTask.value = ""
    getDate(); 
    showTask();
}