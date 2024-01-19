$(document).ready(function(){

  var dtDist = $('#dtDist').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": true,
    "responsive": true,
    "columnDefs": [{ targets: [0], className: 'dt-center valign dt-w10' },
                  { targets: [1,2,3], className: 'dt-left valign dt-w30' }],
    dom: 'Bfrtip',
    "ajax": "AppController/dtDist",
    "order": [] 
});//Datatable View

// console.log(dtDist);
if ($.fn.DataTable.isDataTable('#dtDist')) {
    var dataTable = $('#dtDist').DataTable();
}

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
      var state = $("#state").val();
      var district = $("#district").val();

        if(state == "") {
                $("#state").closest('.form-group').addClass('has-error');
                $("#state").after('<p class="text-danger error-text">State is required</p>');
        } else {
                $("#state").closest('.form-group').removeClass('has-error');
                $("#state").closest('.form-group').addClass('has-success');                   
        }
        if(district == "") {
          $("#district").closest('.form-group').addClass('has-error');
          $("#district").after('<p class="text-danger error-text">Distict is required</p>');
        } else {
                $("#district").closest('.form-group').removeClass('has-error');
                $("#district").closest('.form-group').addClass('has-success');                   
        }     

      if (state && district) {

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
                  target: '#addLinkageForm',
                  showConfirmButton: false,
                  timer: 3000
                });
                Toast.fire({
                  icon: 'success',
                  title: 'District added successfully!'
                });
              });
              // reset the form
              $("#addLinkageForm")[0].reset();
              $('#dtDist').DataTable().ajax.reload();
            } else {
              $("#errorContainer").html('<p class="text-danger">' + response.messages + '</p>');
               $("#errorContainer").show();
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
  $(document).on('click', '#delete_district', function(e){ 
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
          url: 'AppController/delDistrict',
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
              $('#dtDist').DataTable().ajax.reload();
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
        url: 'AppController/getDistricts',
          type: 'post',
          data: {member_id : id},
          dataType: 'json',
          success:function(response) {
            $('#edit_state').val(response.s_id).trigger("change");
            $('#edit_state').data("id", response.s_id);
            $('#d_id').val(response.d_id);
            $('#edit_district').val(response.d_name);
            $(".editModal").append('<input type="hidden" name="d_id" id="d_id" value="'+response.id+'"/>');
            $("#editLinkageForm").unbind('submit').bind('submit', function() {
            $(".text-danger").remove();
            var form = $(this);
            // validation
            var edit_district = $("#edit_district").val();
             if(edit_district === ''){
              $("#edit_district").closest('.form-group').addClass('has-error');
                $("#edit_district").after('<p class="text-danger error-text">Village is required</p>');
              } else {
                $("#edit_district").closest('.form-group').removeClass('has-error');
                $("#edit_district").closest('.form-group').addClass('has-success');                   
              }   

            if (edit_district) {
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
                        title: 'District info updated successfully'
                    });
                    });
                    $('#dtDist').DataTable().ajax.reload();
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