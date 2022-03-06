
////////////////////Set Date prototype getDayName and getMonthName
(function() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
})();


/////////////////////Load todo items
window.onload = function() {
    if(PreviousTodos.length !== 0){
        for(let i=0; i<PreviousTodos.length; i++){
            let id = Object.keys(PreviousTodos[i])[0];
            let Values = PreviousTodos[i][Object.keys(PreviousTodos[i])[0]];
            let date = new Date(id * 1000);
            let element = document.querySelector(`#table${date.getDate()}${date.getMonth()}`);

            if(element){
                addItem(id, Values[0], Values[1], date);
            }else{
                let create = document.createElement('div');
                create.innerHTML = `
                <table id="table${date.getDate()}${date.getMonth()}" class="table table-striped">
                    <thead class="todoListHead">
                        <tr class="headTr">
                            <th class="date">
                                <div class="month">${date.getMonthName()}</div>
                                <div class="year">${date.getFullYear()}</div>
                                <div class="day">${date.getDate()}</div>
                            </th>
                            <th><div class="dayName">${date.getDayName()}</div></th>
                        </tr>
                    </thead>
                    <tbody id="todoListBody${date.getDate()}${date.getMonth()}"></tbody>
                </table>`;
                tables.appendChild(create);
                addItem(id, Values[0], Values[1], Values);
            }
        }
    }
};


/////////////////////Add todo item
function addItem(id, value, checked, date){
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoList = document.querySelector(`#todoListBody${date.getDate()}${date.getMonth()}`);
    let todoItem = value;
    let newTodoTr = document.createElement('tr');
    newTodoTr.id= id;
    let newtodoTd = document.createElement('td');

    if(checked == true){
        newtodoTd.innerHTML = `<input type="checkbox" class="check" checked=${checked}>${todoItem}`;
        newtodoTd.style.textDecoration = "line-through";
    }else{
        newtodoTd.innerHTML = `<input type="checkbox" class="check">${todoItem}`;
    }
    newTodoTr.appendChild(newtodoTd) ;   
    todoInput.value = "";        
    newColumn = document.createElement('td');
    newColumn.innerHTML = `<i class="fa fa-remove" style="font-size:20px; margin-left: 40px;"></i>`;
    newColumn.addEventListener('click', () => {deleteItem(newTodoTr.id, newTodoTr)});
    newTodoTr.appendChild(newColumn);
    todoList.appendChild(newTodoTr);

    let checkboxes = document.querySelectorAll(".check"); 
    let chSituation = newTodoTr.firstChild.children[0].checked;
    let obj ={};
    obj[newTodoTr.id]=[todoItem, chSituation];
    todos.push(obj);

    
    if(PreviousTodos.length == 0){
        localStorage.setItem('todos', JSON.stringify(todos));
    }else{
        if(PreviousTodos.find( element => Object.keys(element)[0] == newTodoTr.id )){
                console.log("yes");
        }else{
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }


    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
            if(checkbox.checked){
                checkbox.parentElement.style.textDecoration = "line-through";               
            }else{
                checkbox.parentElement.style.textDecoration = "none";
            }
            
            for(let i=0; i<todos.length; i++){
                if(todos[i][checkbox.parentElement.parentElement.id]){
                    todos[i][checkbox.parentElement.parentElement.id]=[checkbox.nextSibling.nodeValue, checkbox.parentElement.parentElement.firstChild.children[0].checked];
                }
            }
            localStorage.setItem('todos', JSON.stringify(todos));
        })
    })
}


////////////////////Delete todo item
function deleteItem(rowId, row){
    localStorage.removeItem(rowId);
    row.remove();
}


//////////////////create today todolist
let today = new Date();
let year = document.querySelector("#year");
year.innerHTML = today.getFullYear();
let month = document.querySelector("#month");
month.innerHTML = today.getMonthName();
let day = document.querySelector("#day");
day.innerHTML = today.getDate();
let dayName = document.querySelector("#dayName");;
dayName.innerHTML = today.getDayName();
let PreviousTodos = JSON.parse(localStorage.getItem("todos"));

if(PreviousTodos){
    console.log("yes");
}else{
    let todos = [];
    localStorage.setItem('todos', JSON.stringify(todos));
}


let todoInput = document.querySelector("#todoInput");
const addButton = document.querySelector("span");
const todayList = document.querySelector(".table");
todayList.id = `table${today.getDate()}${today.getMonth()}`;
const todoList = document.querySelector(".todoListBody");
todoList.id = `todoListBody${today.getDate()}${today.getMonth()}`;
const tables = document.querySelector(".todoList");


