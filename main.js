const itemsList = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
const inputTask = document.querySelector(".inputTask");
document.querySelector(".taskNumber").textContent = itemsList.length;

const getDate = () => {
    let date = new Date().toString().split(" ");
    document.querySelector(".date").textContent = date[0] +" "+ date[1] + " "+ date[2];
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
        items += `<div class="row justify-content-center mt-3">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="items d-flex align-items-center">
                <textarea class = "textEdit col-10" disabled>${itemsList[i]}</textarea>
              <i class="fas fa-edit edit text-primary fs-5"></i>
            <i class="fas fa-trash delete text-danger fs-5"></i>
              </div>
            <div class="confirm mt-3">
                <button type="button" class="btn btn-danger cancel">Cancel</button>
                <button type="button" class="btn btn-success save">Save</button>
            </div>
            </div>
          </div>
        </div>
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

const updateTask = (newValue, i) => {
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
    showTask();
    getDate();
    document.addEventListener("keypress", (e) => {
        if(e.key == "Enter")
            createTask(inputTask);
    })
}