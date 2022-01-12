    
$(function(){

    $(".add-container").css('display', 'block');
    $(".edit-container").css('display', 'none');

    function fetchAllTasks(){
        $.ajax({
            type: "POST",
            url: "/tasks",
            data: JSON.stringify({ task: $("#textSearch").val() }),
            headers: {
                'Content-Type': 'application/json',
            },
            dataType: "json",
            success: function(data){
                if(data.result){
                    const todos = data.todos
                    $("#table-body").empty()
                    var strAppend = ``;
                    if(todos.length > 0){
                        todos.forEach((todo, index) =>{
                            strAppend += `
                            <tr>
                                    <td>${(index+1)}</td>
                                    <td style="display: none;" class="taskID">${todo.id}</td>
                                    <td>${todo.task}</td>
                                    <td><label class="switch">
                                            <input type="checkbox" class="change-status" ${(todo.status == 1) ? 'checked' : '' }>
                                            <span class="slider round"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <button class="button-edit"> Edit </button>
                                        <button class="button-delete"> Delete </button>
                                    </td>
                            </tr>`
                        })
                    }else{
                        strAppend += `<tr><td colspan="5" style="font-size: 2rem; color: #677480;">NO TASKS FOUND</td></tr>`
                    }
                    $("#table-body").append(strAppend)

                    $(".button-edit").on('click', function(e){
                        $tr = $(this).closest('tr');
                        var data = $tr.children("td").map(function () {
                            return $(this).text();
                        }).get();
                        $(".add-container").css('display', 'none');
                        $(".edit-container").css('display', 'block');
                        $("input#taskID").val($.trim(data[1]))
                        $("input#updateTask").val($.trim(data[2]))
                    })

                    $(".button-delete").on('click', function(e){
                        if (confirm("Confirm if you want to delete?") == true) {
                            $tr = $(this).closest('tr');
                            var taskID = $tr.children(".taskID").map(function () {
                                return $(this).text();
                            }).get();
                            $.ajax({
                                type: "POST",
                                url: "/removetask",
                                data: JSON.stringify({ taskID: $.trim(taskID[0]) }),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                dataType: "json",
                                success: function(data){
                                    fetchAllTasks()
                                    Swal.fire({
                                        title: 'Done!',
                                        text: data.msg,
                                        icon: 'success',
                                        confirmButtonText: 'Thanks!',
                                        confirmButtonColor: 'green'
                                    });
                                }
                            })
                        }
                    })

                    $(".change-status").on('click', function(e){
                        $tr = $(this).closest('tr');
                        var taskID = $tr.children(".taskID").map(function () {
                            return $(this).text();
                        }).get();

                        $.ajax({
                            type: "POST",
                            url: "/changestatus",
                            data: JSON.stringify({ taskID: $.trim(taskID[0]) }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            dataType: "json",
                            success: function(data){
                                fetchAllTasks()
                                Swal.fire({
                                    title: 'Done!',
                                    text: data.msg,
                                    icon: 'success',
                                    confirmButtonText: 'Thanks!',
                                    confirmButtonColor: 'green'
                                });
                            }
                        })
                    })
                }
            }
        })
    }
    fetchAllTasks()

    $("#btn-submit").on('click', function(e){
        e.preventDefault();
        const task = $("#textTask").val()
        if(task == ''){
            $("#textTask").select();
            Swal.fire({
                title: 'Empty Field!',
                text: 'No empty field allowed!',
                icon: 'warning',
                confirmButtonText: 'Try again!',
                confirmButtonColor: 'orange'
            });
            return;
        }
        $(this).attr('disabled', true)
        $.ajax({
            type: "POST",
            url: "/addtask",
            data: JSON.stringify({ task }),
            headers: {
                'Content-Type': 'application/json',
            },
            dataType: "json",
            success: function(data){
                $(this).attr('disabled', false)
                $("#textTask").select()
                $("#textTask").val('')
                fetchAllTasks()
                Swal.fire({
                    title: 'Done!',
                    text: data.msg,
                    icon: 'success',
                    confirmButtonText: 'Thanks!',
                    confirmButtonColor: 'green'
                });
            }
        })
    })

    $("#btn-update").on('click', function(e){
        e.preventDefault();
        const task = $("#updateTask").val()
        const taskID = $("#taskID").val()
        if( task == '' || taskID == ''){
            Swal.fire({
                title: 'Empty Field!',
                text: 'No empty fields allowed',
                icon: 'warning',
                confirmButtonText: 'Try again!',
                confirmButtonColor: 'orange'
            });
            return;
        }

        $.ajax({
            type: "POST",
            url: "/updatetask",
            data: JSON.stringify({ taskID, task }),
            headers: {
                'Content-Type': 'application/json',
            },
            dataType: "json",
            success: function(data){
                $(this).attr('disabled', false)
                fetchAllTasks()
                $(".add-container").css('display', 'block');
                $(".edit-container").css('display', 'none');
                $("#textTask").select()
                $("#textTask").val('')
                Swal.fire({
                    title: 'Done!',
                    text: data.msg,
                    icon: 'success',
                    confirmButtonText: 'Thanks!',
                    confirmButtonColor: 'green'
                });
            }
        })
    })

    $("#btn-cancel").on('click', function(e){
        e.preventDefault();
        $(".add-container").css('display', 'block');
        $(".edit-container").css('display', 'none');
    })

    $("#textSearch").on('keyup', function(e){
        e.preventDefault();
        fetchAllTasks();
    })
})