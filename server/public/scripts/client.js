$(document).ready(function() {
// on document load
    console.log('JQ ready');
    getTasks();
 // click listeners here:
    $( '#addButton').on('click', addTasks)
    $( '#viewTasks').on('click', '.completed', changeCompleted)
    $( '#viewTasks').on('click', '.delete', deleteTask);
});

function addTasks (){
    console.log('in addTasks');
    let taskToSend = {
        task: $( '#taskIn' ).val(),
        description: $( '#descriptionIn' ).val(),
        completed: $('#completedIn').val()
    }
    console.log('sending:', taskToSend);
    $.ajax({
        method: 'POST',
        url: '/task',
        data: taskToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        getTasks();
        $( '#taskIn' ).val('');
        $( '#descriptionIn' ).val('');
        $('#completedIn').val('');
        $( '#taskIn' ).focus();
    }).catch( function( error ){
        alert( 'error adding task. see console for details' );
        console.log( error );
    })
}   

function changeCompleted (){
    console.log('in completed');
    let id = $(this).closest('tr').data('id');
    $.ajax({
        method: 'PUT',
        url: `/task/${id}`,
    }).then(function(response){
        getTasks();
      }).catch( function( error ){
        alert( 'error with task completion. see console for details' );
        console.log( error );
    })
  }

function deleteTask (){
    let id = $(this).closest('tr').data('id');
    $.ajax({
        method: 'DELETE',
        url: `/task/${id}`,
    }).then(function(response){
        getTasks();
        console.log('deleting:', id);
    }).catch( function( error ){
        alert( 'error deleting task. see console for details' );
        console.log( error );
    })
}

function getTasks (){
    console.log('in getTasks');
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then( function( response ){
        let el = $( '#viewTasks' );
        el.empty(); 
        for( let i=0; i< response.length; i++ ){
            let todos = response[ i ];
            let tr = $(`<tr></tr>`);
            tr.data('id', todos.id);
            el.append( tr );
            tr.append(`<td>${todos.task}</td>`);
            tr.append(`<td>${todos.description}</td>`);
            tr.append(`<td>${todos.completed}</td>`);
            tr.append(`<td><button class="completed">Complete Task</button></td>`);
            tr.append(`<td><button class="delete">Delete Task</button></td>`);
            if( todos.completed === true ){
                tr.addClass('makeGreen');
                }
            }
        }).catch( function( error ){
        alert( 'error getting task. see console for details' );
        console.log( error );
    })     
}
