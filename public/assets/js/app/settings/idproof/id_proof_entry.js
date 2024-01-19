$(document).ready(function(){
	var dtIdtype = $('#dtIdtype').DataTable({
      // "paging": true,
      // "lengthChange": true,
      "processing": true,
      "serverSide": true,
      // "searching": true,
      "ordering": true,
      // "info": true,
      // "autoWidth": true,
      "responsive": true,
      "columnDefs": [{ targets: [0], className: 'dt-center valign dt-w3' },
                    { targets: [1], className: 'dt-left valign dt-w43' },
                    {targets: [2], className: 'dt-center dt-w11 valign'}],
      dom: 'Bfrtip',
      buttons: [
        {extend:'copy', text:'<i class="fa fa-files-o text-white"></i> Copy', titleAttr: 'Copy',orientation: 'landscape',
        pageSize: 'LEGAL'}, 
        {extend:'csv', text:'<i class="fa fa-file-excel-o text-white"></i>  CSV ', titleAttr:'csv',orientation: 'landscape',
        pageSize: 'LEGAL'}, 
        {extend:'excel', text:'<i class="fa fa-file-excel-o text-white"></i> Excel ', titleAttr:'excel',orientation: 'landscape',
        pageSize: 'LEGAL'}, 
        {extend:'pdf', text:'<i class="fa fa-file-pdf-o text-white"></i> PDF ', titleAttr:'pdf',orientation: 'landscape',
        pageSize: 'LEGAL'}, 
        
    ], 
      "order": [],
        // Load data from an Ajax source
        "ajax": {
            "url": "AppController/dtIdtype/",
            "type": "POST"
        },
  });

  //To Select the Image And Save the Data
  $("#addIdBtn").on('click', function(e) {    
    // reset the form 
    $("#addIdForm")[0].reset();
    // remove the error 
    $(".form-group").removeClass('has-error').removeClass('has-success');
    $(".text-danger").remove();
    $("#addIdForm").unbind('submit').bind('submit', function() {
      $(".text-danger").remove();
      var form = $(this);
      // validation                 
      var id_proof_type = $("#id_proof_type").val();
    
        if(id_proof_type == "") {
                $("#id_proof_type").closest('.form-group').addClass('has-error');
                $("#id_proof_type").after('<p class="text-danger error-text">Id Proof Type is required</p>');
        } else {
                $("#id_proof_type").closest('.form-group').removeClass('has-error');
                $("#id_proof_type").closest('.form-group').addClass('has-success');                   
        }
       

      if(id_proof_type) {
        $.ajax({
          url : form.attr('action'),
          type : form.attr('method'),
          data : form.serialize(),
          dataType : 'json',
          success:function(response) {
            // remove the error 
            $(".form-group").removeClass('has-error').removeClass('has-success');

            if(response.success == true) {
              $(function() {
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-right',
                  target: '.idForm',
                  showConfirmButton: false,
                  timer: 3000
                });
                Toast.fire({
                  icon: 'success',
                  title: 'Id Proof Type added successfully!'
                });
              });
              // reset the form
              $("#addIdForm")[0].reset();
              $('#dtIdtype').DataTable().ajax.reload();
            } else {
                Toast.fire({
                  icon: 'error',
                  title: 'Ooops! Something went wrong!'
                })
              }  // /else
          } // success  
        }); // ajax subit   
      }
      return false;
    });    
  });//End add doctor

  //To Select the id of member to delete
  $(document).on('click', '#delete_id_proof_type', function(e){ 
    var memberid = $(this).data('id');
    SwalDelete(memberid);
    e.preventDefault();
  });
});//end of doc ready function

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
          url: 'AppController/delIdtype',
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
              $('#dtIdtype').DataTable().ajax.reload();
          })
          .fail(function(){
           swal.fire('Oops...', 'Something went wrong !', 'error');
          });
       });
        },
     allowOutsideClick: false
  })  
 }

 //edit data
function editMember(id = null) {
    if(id) {
      // remove the error 
      $(".form-group").removeClass('has-error').removeClass('has-success');
      $(".text-danger").remove();
      // remove the id
      $("#member_id").remove();
      // fetch the member data
      $.ajax({
        url: 'AppController/getIdtype',
          type: 'post',
          data: {member_id : id},
          dataType: 'json',
          success:function(response) {
            $('#edit_id_proof_type').val(response.id_proof_type);
            $(".editModal").append('<input type="hidden" name="member_id" id="member_id" value="'+response.id+'"/>');
            $("#editIdForm").unbind('submit').bind('submit', function() {
            $(".text-danger").remove();
            var form = $(this);
            // validation
            var edit_id_proof_type = $("#edit_id_proof_type").val();
  
            if(edit_id_proof_type == "") {
                $("#edit_id_proof_type").closest('.form-group').addClass('has-error');
                $("#edit_id_proof_type").after('<p class="text-danger">Id Proof type is required</p>');
            } else {
                $("#edit_id_proof_type").closest('.form-group').removeClass('has-error');
                $("#edit_id_proof_type").closest('.form-group').addClass('has-success');                   
            }
            
            if(edit_id_proof_type) {
            $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: form.serialize(),
                dataType: 'json',
                success:function(response) {
                if(response.success == true) {
                    $(function() {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        target:"#editIdForm",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    Toast.fire({
                        icon: 'success',
                        title: 'Id Proof type info updated successfully'
                    });
                    });
                    $('#dtIdtype').DataTable().ajax.reload();
                } else {
                    $(function() {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        target:"#editIdForm",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    Toast.fire({
                        icon: 'error',
                        title: 'Ooops! Something went wrong.'
                    });
                    });
                }
                } // /success
            }); // /ajax
            }
            return false;
        });
        }
    });
    } else{
        alert("Error : Refresh the page again");
      }
  }