
function deleteTodo(text) {
    let localTodos = localStorage.getItem("Todo");
    if (localTodos) {
        todoList = JSON.parse(localTodos);
    } else {
        todoList = [];
    }
    var index = todoList.indexOf(text);
    if (index !== -1) {
        todoList.splice(index, 1);
    }
    localStorage.setItem("Todo", JSON.stringify(todoList))
    showTodos();
}

function showTodos() {
    let localTodos = localStorage.getItem("Todo");
    if (localTodos) {
        todoList = JSON.parse(localTodos);
    } else {
        todoList = [];
    }

    let myList = document.getElementById("myUL");
    myList.innerHTML = "";
    for (i = 0; i < todoList.length; i++) {
        var li = document.createElement("li");
        if (todoList[i].slice(0, 1) === '!') {
            li.classList.toggle("checked");
            var t = document.createTextNode(todoList[i].slice(1));
        } else {
            var t = document.createTextNode(todoList[i]);
        }
        li.appendChild(t);
        myList.appendChild(li)
    }

    var myNodelist = document.getElementsByTagName("LI");
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let text = this.parentElement.innerText.split(/\r?\n/)[0];
            if (this.parentElement.classList.contains("checked")) {
                text = '!' + text;
            }
            deleteTodo(text);
        }
    }  
}    

function addToList() {
    let localTodos = localStorage.getItem("Todo");
    if (localTodos) {
        todoList = JSON.parse(localTodos);
    } else {
        todoList = [];
    }
    todoList.push(document.getElementById("myInput").value)
    document.getElementById("myInput").value = ""
    localStorage.setItem("Todo", JSON.stringify(todoList))
    showTodos();
}

function addChecked(text) {
    let localTodos = localStorage.getItem("Todo");
    if (localTodos) {
        todoList = JSON.parse(localTodos);
    } else {
        todoList = [];
    }
    var index = todoList.indexOf(text);
    if (index !== -1) {
        todoList[index] = '!' + todoList[index];
    }
    localStorage.setItem("Todo", JSON.stringify(todoList))
    showTodos();
}

function removeChecked(text) {
    let localTodos = localStorage.getItem("Todo");
    if (localTodos) {
        todoList = JSON.parse(localTodos);
    } else {
        todoList = [];
    }
    var index = todoList.indexOf('!' + text);
    if (index !== -1) {
        todoList[index] = todoList[index].slice(1);
    }
    localStorage.setItem("Todo", JSON.stringify(todoList))
    showTodos();
}

const myList = document.getElementById("myUL")
myList.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            if (ev.target.classList.contains('checked')) {
                removeChecked(ev.target.innerText.split(/\r?\n/)[0]);
            } else {
                addChecked(ev.target.innerText.split(/\r?\n/)[0]);
            }
            ev.target.classList.toggle('checked');
        }
    }, false);  

const inputField = document.getElementById("myInput")
inputField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addToList();
    }
});

showTodos();