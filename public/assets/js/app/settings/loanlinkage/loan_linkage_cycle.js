$(document).ready(function(){
	var dtLoanCycle = $('#dtLoanCycle').DataTable({
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
            "url": "AppController/dtLoanCycle/",
            "type": "POST"
        },
  });

  //To Select the Image And Save the Data
  $("#addIdBtn").on('click', function(e) {    
    // reset the form 
    $("#addLinkageForm")[0].reset();
    // remove the error 
    $(".form-group").removeClass('has-error').removeClass('has-success');
    $(".text-danger").remove();
    $("#addLinkageForm").unbind('submit').bind('submit', function() {
      $(".text-danger").remove();
      var form = $(this);
      // validation                 
      var loan_cycle = $("#loan_cycle").val();
    
        if(loan_cycle == "") {
                $("#loan_cycle").closest('.form-group').addClass('has-error');
                $("#loan_cycle").after('<p class="text-danger error-text">Loan Cycle is required</p>');
        } else {
                $("#loan_cycle").closest('.form-group').removeClass('has-error');
                $("#loan_cycle").closest('.form-group').addClass('has-success');                   
        }
       

      if(loan_cycle) {
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
                  title: 'Loan Cycle added successfully!'
                });
              });
              // reset the form
              $("#addLinkageForm")[0].reset();
              $('#dtLoanCycle').DataTable().ajax.reload();
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
  $(document).on('click', '#delete_loancycle', function(e){ 
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
          url: 'AppController/delLoanCycle',
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
              $('#dtLoanCycle').DataTable().ajax.reload();
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
        url: 'AppController/getLoanCycle',
          type: 'post',
          data: {member_id : id},
          dataType: 'json',
          success:function(response) {
            $('#edit_loan_cycle').val(response.loan_cycle);
            $(".editModal").append('<input type="hidden" name="member_id" id="member_id" value="'+response.id+'"/>');
            $("#editLinkageForm").unbind('submit').bind('submit', function() {
            $(".text-danger").remove();
            var form = $(this);
            // validation
            var edit_loan_cycle = $("#edit_loan_cycle").val();
  
            if(edit_loan_cycle == "") {
                $("#edit_loan_cycle").closest('.form-group').addClass('has-error');
                $("#edit_loan_cycle").after('<p class="text-danger">Loan Cycle is required</p>');
            } else {
                $("#edit_loan_cycle").closest('.form-group').removeClass('has-error');
                $("#edit_loan_cycle").closest('.form-group').addClass('has-success');                   
            }
            
            if(edit_loan_cycle) {
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
                        target:"#editLinkageForm",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    Toast.fire({
                        icon: 'success',
                        title: 'Loan cycle updated successfully'
                    });
                    });
                    $('#dtLoanCycle').DataTable().ajax.reload();
                } else {
                    $(function() {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        target:"#editLinkageForm",
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