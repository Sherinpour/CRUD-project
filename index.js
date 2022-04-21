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
let PreviousTodos = getTodos();
if(!PreviousTodos){
    let todos = {};
    localStorage.setItem('todos', JSON.stringify(todos));
}
var root = document.querySelector(':root');
let todoInput = document.querySelector("#todoInput");
const addButton = document.querySelector("span");
const todayList = document.querySelector(".table");
todayList.id = `table${today.getDate()}${today.getMonth()}`;
const todoList = document.querySelector(".todoListBody");
todoList.id = `todoListBody${today.getDate()}${today.getMonth()}`;
const tables = document.querySelector(".todoList");

/////////////////////Load todo items
window.onload = function() {
    makePreviousTodos()
};


function makePreviousTodos(){
    if(Object.keys(PreviousTodos).length !== 0){
        for(let i=0; i<Object.keys(PreviousTodos).length; i++){
            let id = Object.keys(PreviousTodos)[i];
            let Values = PreviousTodos[Object.keys(PreviousTodos)[i]];
            let date = new Date(id * 1000);
            let element = document.querySelector(`#table${date.getDate()}${date.getMonth()}`);

            if(element){
                addItem(Values[0], id, Values[1], date);
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
                addItem(Values[0], id, Values[1], date);
            }
        }

    }else{
        console.log("You do not have any previous Todo!!");
    }
}

function addItemClickHandler(){
    let inputValue = document.querySelector('')
    addItem(inputValue)
}

function getTodos(){
    let todos = JSON.parse(localStorage.getItem("todos"));
    return todos
}

function updateTodos(todos){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function generateId(){
    return Math.floor(Date.now() / 1000);
}

function getTodosElementByDate(date = new Date()){
    return document.querySelector(`#todoListBody${date.getDate()}${date.getMonth()}`)
}


function addItem(value, id=generateId(), checked=false, date){
    let todos = getTodos();
    let todoList = getTodosElementByDate(date);
    let todoValue = value;
    let newTodoTr = document.createElement('tr');
    newTodoTr.id = id;
    let newtodoTd = document.createElement('td');
    newtodoTd.innerHTML = `<input type="checkbox" class="check"  onclick="checkTodo(event)">${todoValue}`;
    newtodoTd.className = checked ? 'todoItemChecked' : 'todoItemUnChecked';
    newtodoTd.checked = checked ? true : false;
    newTodoTr.appendChild(newtodoTd) ;   
    todoInput.value = "";  

    editTodoColumn = document.createElement('td');
    editTodoColumn.innerHTML = `<i class="bi bi-pencil edit-icon" onclick="editTodo(event)"></i>`;
    editTodoColumn.innerHTML += `<i class="bi bi-save" style='display: none'></i>`;

    removeColumn = document.createElement('td');
    removeColumn.innerHTML = `<i class="bi bi-journal-x remove-icon"></i>`; 
    removeColumn.addEventListener('click', () => {deleteItem(newTodoTr.id, newTodoTr)});
    newTodoTr.appendChild(editTodoColumn);
    
    newTodoTr.appendChild(removeColumn);
    todoList.appendChild(newTodoTr);

    let chSituation = newTodoTr.firstChild.children[0].checked;
    todos[newTodoTr.id]=[todoValue, chSituation];
    if(Object.keys(PreviousTodos).length == 0){
        updateTodos(todos);
    }else{
        if(!PreviousTodos[newTodoTr.id]){
            updateTodos(todos);
        }
    }
}

function checkTodo(event){
    let todos = getTodos();
    if(event.target.checked){
        event.target.parentElement.className = "todoItemChecked";             
    }else{
        event.target.parentElement.className = "todoItemUnChecked"; 
    }                
    todos[event.target.parentElement.parentElement.id] = [event.target.nextSibling.nodeValue, event.target.parentElement.parentElement.firstChild.children[0].checked];
    localStorage.setItem('todos', JSON.stringify(todos));
}
 
function editTodo(event){
    let rowValues = event.target.parentElement.parentElement.childNodes[0];
    let preCheck= event.target.parentElement.parentElement.childNodes[0].childNodes[0].checked
    let ProwValue = rowValues.childNodes[1].data; 
    event.target.style.display = 'none';
    event.target.parentElement.childNodes[1].style.display='block';
    event.target.parentElement.childNodes[1].addEventListener('click', () => {setNewValue(event,preCheck)});
    rowValues.innerHTML = `<input type="input" class="form-control" value=${ProwValue}>`;
}

function setNewValue(event, preCheck){
    let todos = getTodos();
    let rowValue = event.target.parentElement.parentElement.childNodes[0];
    let newValue = event.target.parentElement.previousSibling.firstChild.value;
    event.target.parentElement.childNodes[1].style.display='none';
    event.target.parentElement.childNodes[0].style.display = "block";
    todos[event.target.parentElement.parentElement.id][0] = newValue;
    rowValue.innerHTML = `<input type="checkbox" class="check" onclick="checkTodo(event)">${newValue}`;
    if(preCheck){rowValue.checked = true;}
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteItem(rowId, row){
    let todos = getTodos();
    delete todos[rowId];
    localStorage.setItem('todos', JSON.stringify(todos));
    row.remove();
}

function themeSwitcher(event){
    var darkTheme = event.target.classList.toggle('dark');
    if (darkTheme) {
        root.style.setProperty('--background-color', '#1e1d1d')
        root.style.setProperty('--text-color', '#f0ecec')
        root.style.setProperty('--table-tr-color', '#e6dada')
        root.style.setProperty('--table-striped-bg', '#393939')
        root.style.setProperty('--table-box-shadow-color', '#393939')
        root.style.setProperty('--theme-toogle-btn-color', '#f0ecec')

    } else {
        root.style.setProperty('--background-color', 'white')
        root.style.setProperty('--text-color', 'black')
        root.style.setProperty('--table-tr-color', 'black')
        root.style.setProperty('--table-striped-bg', 'rgba(0, 0, 0, 0.05)')
        root.style.setProperty('--table-box-shadow-color', '#DDD3D3')
        root.style.setProperty('--theme-toogle-btn-color', 'black')
    }
}

