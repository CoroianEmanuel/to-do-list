const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if(inputBox.value === ''){
        alert("You must write something!");
    } else {
        var li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        var span1 = document.createElement('span');
        span1.classList.add('span1');
        span1.innerHTML = "\u00d7";
        li.appendChild(span1);

        var span2 = document.createElement('span');
        span2.classList.add('span2');
        span2.innerHTML = "\u270E";
        li.appendChild(span2);
        contor();
    }
    inputBox.value = "";
    saveData();
    return true;
} 
inputBox.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
    saveData();
});
listContainer.addEventListener("click", function(a){
    if(a.target.tagName === "LI"){
        a.target.classList.toggle("checked");
        contor();
        saveData();
    } else if (a.target.classList.contains ("span1")){
        a.target.parentElement.remove();
        contor();
        saveData();
    } else if (a.target.classList.contains("span2")) {
        var li = a.target.parentElement;
        var currentText = li.firstChild.textContent;

        var input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.classList.add('edit-input');

        li.firstChild.textContent = '';
        li.insertBefore(input, li.firstChild);

        input.focus();
        input.select();

        input.addEventListener('blur', updateText);
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                updateText();
            }
        });
        function updateText() {
            var newText = input.value;
            li.removeChild(input); 
            li.firstChild.textContent = newText; 
            saveData();
        }
    }
});
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function getData(){
    listContainer.innerHTML = localStorage.getItem("data");
}
contor();
getData();

function contor(){
    var taskCreated = document.querySelectorAll('#list-container li').length; 
    var taskChecked = document.getElementsByClassName('checked').length; 

    document.getElementById('numbers').textContent = `${taskChecked} / ${taskCreated}`;
}


var hrs = document.getElementById('hrs');
var min = document.getElementById('min');
var sec = document.getElementById('sec');

setInterval(() => {
    var currentTime = new Date();

hrs.innerHTML = currentTime.getHours();
min.innerHTML = currentTime.getMinutes();
sec.innerHTML = currentTime.getSeconds();
}, 1000);


