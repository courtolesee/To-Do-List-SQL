// on document load
$(document).ready(function() {
 console.log('JQ ready');
 getTasks();
 // click listeners here:

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