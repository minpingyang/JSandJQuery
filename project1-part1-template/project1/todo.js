$(document).ready(function(e) {
	$('#add-todo').button({
		icons: { primary: "ui-icon-circle-plus" }}).click(
		function() {
			$('#new-todo').dialog('open');
        });
        
	$('#new-todo').dialog( {
		modal : true , autoOpen : false ,
		buttons : {
			"Add task" : function () { 
                var taskName = $('#task').val();
                var userName = $('#user').val();
				if (userName===""||taskName === "") { return false;}
                
                var taskHTML ='<li><span class="done">%</span>';
                taskHTML +='<span class="edit">+</span>';
                taskHTML +='<span class="delete">x</span>';
                taskHTML +='<span class="task"></span>';
                taskHTML +='<span class="user"></span></li>';
             
                var $newTask=$(taskHTML);
                $newTask.find('.task').text(taskName);
                $newTask.find('.user').text(userName);
                $newTask.hide();
                $('#todo-list').prepend($newTask);
                $newTask.show('clip',250).effect('highlight',1000);

                $(this).dialog('close');
			},
			"Cancel" : function () { $(this).dialog('close'); }
		}
    });
    $('#todo-list').on('click','.done',function(){
        var $taskItem=$(this).parent('li');
        $taskItem.slideUp(250,function(){
            var $this=$(this);
            $this.detach();
            $('#completed-list').prepend($this);
            $this.slideDown();
        });
    });
    $('.sortlist').sortable({
        connectWith : '.sortlist',
        cursor : 'pointer',
        placeholder : 'ui-state-highlight',
        cancel : '.delete,.done'
    });
    
    $('.sortlist').on('click','.delete',function() {
        
        checkstr=confirm('Do you want to confirm deletion?')
        if(checkstr == true){
            $(this).parent('li').effect('puff', function() { $(this).remove(); });
        }else{
            return false;
        }
       
    });
    var edit_item;
    $('.sortlist').on('click','.edit',function() {
        edit_item=$(this).parent('li');
        $('#edit-todo').dialog('open');
    });
    $('#edit-todo').dialog( {
		modal : true , autoOpen : false ,
		buttons : {
			"Confirm" : function () { 
                var taskName1 = $('#task1').val();
                var userName1 = $('#user1').val();
				if (userName1===""||taskName1 === "") { return false;}
                
                edit_item.find('.task').text(taskName1);
                edit_item.find('.user').text(userName1);

                $(this).dialog('close');
			},
			"Cancel" : function () { $(this).dialog('close'); }
		}
    });

}); // end ready
