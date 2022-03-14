
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
    if(Object.keys(PreviousTodos).length !== 0){
        for(let i=0; i<Object.keys(PreviousTodos).length; i++){
            let id = Object.keys(PreviousTodos)[i];
            let Values = PreviousTodos[Object.keys(PreviousTodos)[i]];
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
                addItem(id, Values[0], Values[1], date);
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
        newtodoTd.innerHTML = `<input type="checkbox" class="check" checked onclick="checkTodo(event)">${todoItem}`;
        newtodoTd.className = "todoItemChecked";
    }else{
        newtodoTd.innerHTML = `<input type="checkbox" class="check" onclick="checkTodo(event)">${todoItem}`;
        newtodoTd.className = "todoItemUnChecked";
    }
    newTodoTr.appendChild(newtodoTd) ;   
    todoInput.value = "";        
    newColumn = document.createElement('td');
    newColumn.innerHTML = `<i class="material-icons" style="font-size:20px; margin-left:90px;" onclick="editTodo(event)">edit</i>`;


    newColumn2 = document.createElement('td');
    newColumn2.innerHTML = `<i class="fa fa-remove" style="font-size:20px; margin-left: 10px;"></i>`;

    newColumn2.addEventListener('click', () => {deleteItem(newTodoTr.id, newTodoTr)});

    newTodoTr.appendChild(newColumn);
    newTodoTr.appendChild(newColumn2);

    todoList.appendChild(newTodoTr);

    
    let chSituation = newTodoTr.firstChild.children[0].checked;
    todos[newTodoTr.id]=[todoItem, chSituation];
    if(Object.keys(PreviousTodos).length == 0){
        localStorage.setItem('todos', JSON.stringify(todos));
    }else{
        if(!PreviousTodos[newTodoTr.id]){
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
}


/////////////////////Check and unCheck todo item
function checkTodo(event){
    let todos = JSON.parse(localStorage.getItem("todos"));
    if(event.target.checked){
        event.target.parentElement.className = "todoItemChecked";             
    }else{
        event.target.parentElement.className = "todoItemUnChecked"; 
    }            
    todos[event.target.parentElement.parentElement.id] = [event.target.nextSibling.nodeValue, event.target.parentElement.parentElement.firstChild.children[0].checked];
    localStorage.setItem('todos', JSON.stringify(todos));
}
 

/////////////////////Edit todo item
function editTodo(event){
    let rowValues = event.target.parentElement.parentElement.childNodes[0];
    let preCheck= event.target.parentElement.parentElement.childNodes[0].childNodes[0].checked
    let ProwValue = rowValues.childNodes[1].data; 
    event.target.style.display = 'none';
    rowValues.innerHTML = `<input type="input" class="form-control" value=${ProwValue} onkeypress="newValue(event,${preCheck})">`;
}

//////////////////////set new Value of todo item
function newValue(event, preCheck){
    if(event.key === 'Enter'){
        let todos = JSON.parse(localStorage.getItem("todos"));
        let rowValues = event.target.parentElement.parentElement.childNodes[0];
        event.target.parentElement.nextSibling.firstChild.style.display = "block";
        todos[event.target.parentElement.parentElement.id][0] = event.target.value;
        if(preCheck){
            rowValues.innerHTML = `<input type="checkbox" class="check" checked onclick="checkTodo(event)">${event.target.value}`;
        }else{
            rowValues.innerHTML = `<input type="checkbox" class="check" onclick="checkTodo(event)">${event.target.value}`;
        }
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}


////////////////////Delete todo item
function deleteItem(rowId, row){
    let todos = JSON.parse(localStorage.getItem("todos"));
    delete todos[rowId];
    localStorage.setItem('todos', JSON.stringify(todos));
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
/*const proxy = new Proxy({}, {

    set: (obj, prop, value) => { ... },
    // more props here
  });
*/
if(!PreviousTodos){
    let todos = {};
    localStorage.setItem('todos', JSON.stringify(todos));
}


let todoInput = document.querySelector("#todoInput");
const addButton = document.querySelector("span");
const todayList = document.querySelector(".table");
todayList.id = `table${today.getDate()}${today.getMonth()}`;
const todoList = document.querySelector(".todoListBody");
todoList.id = `todoListBody${today.getDate()}${today.getMonth()}`;
const tables = document.querySelector(".todoList");