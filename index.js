
//Set Date prototype getDayName and getMonthName
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

//Add todo item
function addItem(){
    let now = new Date();
    let todoItem = todoInput.value;
    let newTodoTr = document.createElement('tr');
    newTodoTr.id= now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    let newtodoTh = document.createElement('td');
    newtodoTh.innerHTML = `
    <input type="checkbox" class="check">
    ${todoItem}
    `;

    localStorage.setItem(newTodoTr.id, todoItem)
    newTodoTr.appendChild(newtodoTh) ;   
    todoInput.value = "";        
    
    newColumn = document.createElement('td');
    newColumn.innerHTML = `<i class="fa fa-remove" style="font-size:20px; margin-left: 40px;"></i>`;
    newColumn.addEventListener('click', () => {deleteItem(newTodoTr.id, newTodoTr)});
    newTodoTr.appendChild(newColumn);
    todoList.appendChild(newTodoTr);

    let checkboxes = document.querySelectorAll(".check");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
            if(checkbox.checked){
                checkbox.parentElement.style.textDecoration = "line-through";
            }else{
                checkbox.parentElement.style.textDecoration = "none";
            }
        })
    })
}

//Delete todo item
function deleteItem(rowId, row){
    localStorage.removeItem(rowId);
    row.remove();
}


let today = new Date();
let year = document.querySelector("#year");
year.innerHTML = today.getFullYear();
let month = document.querySelector("#month");
month.innerHTML = today.getMonthName();
let day = document.querySelector("#day");
day.innerHTML = today.getDate();
let dayName = document.querySelector("#dayName");;
dayName.innerHTML = today.getDayName();

let todoInput = document.querySelector("#todoInput");
const addButton = document.querySelector("span");
const todoList = document.querySelector("#todoListBody");
addButton.addEventListener("click", addItem)