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
        items += ` <div class=" row list justify-content-space-between  py-2 mx-3 mb-3" >
        <div class="cadre col-9">
            <textarea class = "textEdit col-12" disabled>${itemsList[i]}</textarea>
        </div>
        <div class="icon col-2 d-flex  align-items-center ">
            <i class="fas fa-edit edit text-primary fs-5"></i>
            <i class="fas fa-trash delete text-danger fs-5"></i>
        </div>
    </div>              
    <div class="confirm mb-3 px-3 ">
            <button type="button" class="btn btn-danger cancel">Cancel</button>
            <button type="button" class="btn btn-success save">Save</button>
    </div>`;
    }
    document.querySelector(".todo-list").innerHTML += items;
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
            document.querySelectorAll(".textEdit")[i].style.background = "white";

        });
    });
}

const activateSave = () => {
    document.querySelectorAll(".save").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            updateItem(document.querySelectorAll(".textEdit")[i].value , i);
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