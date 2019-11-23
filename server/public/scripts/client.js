// on document load
$(document).ready(function() {
 console.log('JQ ready');
 getTasks();
 // click listeners here:
 $( '#addButton').on('click', addTasks)
 $( '#viewTasks').on('click', '.completed', changeCompleted)
});

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
            let tr = $(`<tr>
                        <td>${ todos.task }</td> 
                        <td>${ todos.description }</td> 
                        <td>${ todos.completed }</td> 
                        <td><button class="completed">Complete Task</button></td>
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
    // let completed = $(this).closest('tr').children()[2].textContent;
    // console.log(completed);
    $.ajax({
        method: 'PUT',
        url: `/task/${id}`,
        // data: {
        //     completed: completed
        // }
    }).then(function(response){
        getTasks();
      }).catch( function( error ){
        alert( 'error with task completion. see console for details' );
        console.log( error );
    })
  }
