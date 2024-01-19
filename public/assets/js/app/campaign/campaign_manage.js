$(document).ready(function(){
	//Data Table Function
    var dtCampaign = $('#dtCampaign').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": true,
        "responsive": true,
        "columnDefs": [{ targets: [0], className: 'dt-center valign dt-w3' },
                      { targets: [1], className: 'dt-left valign dt-w25' },
                      { targets: [2,3], className: 'dt-center valign dt-w25' },
                      {targets: [4], className: 'dt-center dt-w22 valign'}],
        dom: 'Bfrtip',
        "ajax": "AppController/dtCampaign",
        "order": [] 
    });//Datatable View

   

    //To Select the id of member to delete
    $(document).on('click', '#delete_campaign', function(e){ 
        var memberid = $(this).data('id');
        SwalDelete(memberid);
        e.preventDefault();
    });
  
  });//end doc ready function

  //Delete Swal popup
function SwalDelete(memberid){  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: function() {
         return new Promise(function(resolve) {                
            $.ajax({
            url: 'AppController/delCampaign',
            type: 'POST',
               data: {member_id : memberid},
               dataType: 'json'
            })
            .done(function(response){
                Swal.fire(
                      'Deleted!',
                      response.messages,
                      'success'
                );
                $('#dtCampaign').DataTable().ajax.reload();
            })
            .fail(function(){
             swal.fire('Oops...', 'Something went wrong !', 'error');
            });
         });
          },
       allowOutsideClick: false
    })  
   }

   //View Campaign
function viewCampaign(id = null) {
  if(id) {   
    $.ajax({
      url: 'AppController/viewCampaign',
      type: 'post',
      data: {member_id : id},
      dataType: 'json',
      success:function(response) {
        $('#cid').val(response.id);
        $('#cname').html(response.campaign_name);
        $('#st').html(response.s_name);
        $('#ds').html(response.d_name);
        $('#tl').html(response.t_name);
        $('#gp').html(response.g_name);
        $('#vl').html(response.v_name);
        $('#pn').html(response.p_code);       
      }
    });

    //Data Table Function
    var dtLead = $('#dtLead').DataTable({
      "paging": true,
      "lengthChange": true,
      "searching": true,
      "destroy": true,
      "ordering": true,
      "info": true,
      "autoWidth": true,
      "responsive": true,
      "columnDefs": [{ targets: [0], className: 'dt-center valign dt-w3' },
							{ targets: [1,2,3,4,5,6,7,8,9,10,11,12], className: 'dt-left valign dt-w7' },
							{targets: [13], className: 'dt-center dt-w13 valign'}],
      dom: 'Bfrtip',
      ajax: {
          type: 'POST',
          url: 'AppController/dtLead',
          data: function(data) {
              data.cid = id
          },
      },
      "order": [] 
    });//Datatable View
    } else{
      alert("Error : Refresh the page again");
    }
  }
  
 
