// on document load
$(document).ready(function() {
 console.log('JQ ready');
 getTasks();
 // click listeners here:
 $( '#addButton').on('click', addTasks)
});

function getTasks (){
    console.log('in getTasks');
    $.ajax({
        type: 'GET',
        url: '/task'
    }).then( function( response ){
        let el = $( '#viewTasks' );
        el.empty(); 
        for( let i=0; i< response.length; i++ ){
            let todos = response[ i ];
            let tr = $(`<tr>
                        <td>${ todos.task }</td> 
                        <td>${ todos.description }</td> 
                        <td>${ todos.completed }</td> 
                        <td><button class="complted">Complete Task</button></td>
                        <td><button class="delete">Delete Task</button></td>
                        </tr>`);
            tr.data('id', todos.id);
            el.append( tr );
        }
        }).catch( function( error ){
        alert( 'error getting task. see console for details' );
        console.log( error );
    })     
}

function addTasks (){
    console.log('in addTasks');
    let taskToSend = {
        task: $( '#taskIn' ).val(),
        description: $( '#descriptionIn' ).val(),
        completed: $('#completedIn').val()
    }
    console.log('sending:', taskToSend);
    $.ajax({
        type: 'POST',
        url: '/task',
        data: taskToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        getTasks();
    }).catch( function( error ){
        alert( 'error adding task. see console for details' );
        console.log( error );
    })
}   
