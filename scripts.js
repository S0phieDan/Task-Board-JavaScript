function create_task_from_form()
{
    var new_task = {
        content_of_task: document.getElementById('content_of_task').value,
        due_date: document.getElementById('due_date').value,
        due_hour: document.getElementById('due_hour').value
    };



    if(task_validation(new_task)){
        add_task_to_tasks(new_task);
    }

    clear_form();

    
}

function task_validation(task_to_check){
    var isValidTask = true;
    var errors = "";

    if(task_to_check.content_of_task == ""){
        errors += "Empty content of task!\n";
        isValidTask = false;

    }

    if(task_to_check.due_date == ""){
        errors += "Empty due date of task!\n";
        isValidTask = false;

    }

    if(task_to_check.due_hour == ""){
        errors += "Empty due hour of task!\n";
        isValidTask = false;
    }

    if(errors != ""){
        alert(errors);
    }

    return isValidTask;
}

function add_task_to_tasks(task_to_add){

    let tasks = JSON.parse(localStorage.getItem('local_tasks'));

    if (tasks == null) {
        tasks = [task1,task2];
        tasks.push(task_to_add);
        localStorage.setItem('local_tasks', JSON.stringify(tasks));
      } 
    else {
        tasks.push(task_to_add);
        localStorage.setItem('local_tasks', JSON.stringify(tasks));
      }

    draw_last_task(tasks);
}

function draw_last_task(array_of_tasks){
    let div_of_task = document.createElement('div');
    div_of_task.classList.add('task');
    div_of_task.classList.add('cl'+(array_of_tasks.length-1)+'');
    div_of_task.classList.add("new-task");
    
    create_elems_inside_task(array_of_tasks,div_of_task,(array_of_tasks.length-1));

    document.getElementById('list_of_tasks').appendChild(div_of_task);

}

function create_elems_inside_task(array_of_tasks,div_of_task,index){
    let icon = document.createElement('i');
    icon.classList.add("fa", "fa-times");
    icon.setAttribute("onclick", 'delete_task('+ (index) +')');
    icon.style.visibility = "hidden";
    div_of_task.setAttribute("onmouseover", 'show_icon('+ (index) +')');
    div_of_task.setAttribute("onmouseout", 'hide_icon('+ (index) +')');
    div_of_task.appendChild(icon);

    let div_inside_task = document.createElement('div');
    div_inside_task.classList.add("inside-task");
    div_inside_task.innerText = array_of_tasks[index].content_of_task;
    div_of_task.appendChild(div_inside_task);

    let div_date = document.createElement('div');
    div_date.classList.add("task-date");
    let str = "";
    str += change_date_format(array_of_tasks[index].due_date) + "\n";
    str += array_of_tasks[index].due_hour;
    div_date.innerText = str;
    div_of_task.appendChild(div_date);
}

function change_date_format(date_to_change){
    var str_new_format ="";
    var msec = Date.parse(date_to_change)
    var d = new Date(msec);
    str_new_format = d.getDate()+"/"+(d.getMonth()+1) +"/"+d.getFullYear();

    return str_new_format;
}

function delete_task(index){
    let array_of_tasks = JSON.parse(localStorage.getItem('local_tasks'));
    array_of_tasks.splice(index, 1);
    localStorage.setItem('local_tasks', JSON.stringify(array_of_tasks));
    draw_tasks();
    
}

function show_icon(index){
    let c = document.querySelector('.cl'+ index +'').childNodes;
    c[0].style.visibility = "visible";
}

function hide_icon(index){
    let c = document.querySelector('.cl'+ index +'').childNodes;
    c[0].style.visibility = "hidden";
}

function draw_tasks(){

    let array_of_tasks = JSON.parse(localStorage.getItem('local_tasks'));

    if (array_of_tasks == null) {
        array_of_tasks = [task1,task2];
        localStorage.setItem('local_tasks', JSON.stringify(array_of_tasks));
    }  
    
    document.getElementById('list_of_tasks').innerHTML = "";

    for(let i=0; i<array_of_tasks.length; i++){
        let div_of_task = document.createElement('div');
        div_of_task.setAttribute("class","task");
        div_of_task.classList.add('cl'+i+'');

        create_elems_inside_task(array_of_tasks,div_of_task,i);

        document.getElementById('list_of_tasks').appendChild(div_of_task);
    }
}

function clear_form(){
    document.querySelector('form').reset();
}

var task1 = {
    content_of_task: "Complete JS project",
    due_date: "2020-01-15",
    due_hour: "12:00"
}

var task2 = {
    content_of_task: "Learn JSON",
    due_date: "2019-02-04",
    due_hour: "18:30"
}

window.onload = function(){
    draw_tasks();
}

