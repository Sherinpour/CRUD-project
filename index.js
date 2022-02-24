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
    
    let PreviousTodos = Object.entries(localStorage);
    if(PreviousTodos.length !== 0){
        for(let i=0; i<PreviousTodos.length; i++){
            let id = PreviousTodos[i][0];
            let inf = JSON.parse(localStorage.getItem(id));
            addItem(id, inf[0], inf[1]);
        }
    }
};

/////////////////////Add todo item
function addItem(id, value, checked){
    let todoItem = value;
    let newTodoTr = document.createElement('tr');
    
    newTodoTr.id= id;
    let newtodoTd = document.createElement('td');
    if(checked == true){
        newtodoTd.innerHTML = `<input type="checkbox" class="check" checked=${checked}>${todoItem}`;
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
    let arr = [todoItem, newTodoTr.firstChild.children[0].checked]
    localStorage.setItem(newTodoTr.id, JSON.stringify(arr));
   
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
            if(checkbox.checked){
                checkbox.parentElement.style.textDecoration = "line-through";
                let array = [checkbox.nextSibling.nodeValue, checkbox.parentElement.parentElement.firstChild.children[0].checked]
                localStorage.setItem(newTodoTr.id, JSON.stringify(array));
                
            }else{
                checkbox.parentElement.style.textDecoration = "none";
                let array = [checkbox.nextSibling.nodeValue, checkbox.parentElement.parentElement.firstChild.children[0].checked]
                localStorage.setItem(newTodoTr.id,JSON.stringify(array));
                
                
            }
        })
    })
}

////////////////////Delete todo item
function deleteItem(rowId, row){
    localStorage.removeItem(rowId);
    row.remove();
}


//var element = document.querySelector('.todoList');
//element.scrollTop = element.scrollHeight;



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






