$(document).ready(function(){
  $("#state").change(function() {
    var stateId = $(this).val();
    
    // Make an AJAX request to get district data
    $.ajax({
        url: "AppController/getDistrict",
        type: "POST",
        data: { id: stateId },
        dataType: "json",
        success: function(data) {
            // Populate District dropdown
            var districtDropdown = $("#dist");
            districtDropdown.empty();
            districtDropdown.append('<option value="0">Choose one</option>');
              var did = $("#dist").data("id");
            $.each(data, function (index, element) {
                  districtDropdown.append('<option value="' + element.d_id + '" ' + (element.d_id == did ? 'selected="true"' : "") + '>' + element.d_name + '</option>');
              });
              districtDropdown.trigger("change");
        },
        error: function(xhr, status, error) {
            console.error("Error fetching district data: " + error);
        }
    });
});//end state

  $("#dist").change(function() {
    var distId = $(this).val();	    
    // Make an AJAX request to get taluk data
    $.ajax({
        url: "AppController/getTaluk",
        type: "POST",
        data: { id: distId },
        dataType: "json",
        success: function(data) {
            // Populate Taluk dropdown
            var talukDropdown = $("#taluk");
            talukDropdown.empty();
            talukDropdown.append('<option value="0">Choose one</option>');
              var tid = $("#taluk").data("id");
            $.each(data, function(index, element) {
                talukDropdown.append('<option value="' + element.t_id + '" ' +(element.t_id == tid ? 'selected="true"' : "")+'>' + element.t_name + '</option>');
            });
              talukDropdown.trigger("change");
        },
        error: function(xhr, status, error) {
            console.error("Error fetching taluk data: " + error);
        }
    });
});//end dist

$("#edit_state").change(function() {
  var stateId = $(this).val();
  
  // Make an AJAX request to get district data
  $.ajax({
      url: "AppController/getDistrict",
      type: "POST",
      data: { id: stateId },
      dataType: "json",
      success: function(data) {
          // Populate District dropdown
          var districtDropdown = $("#edit_dist");
          districtDropdown.empty();
          districtDropdown.append('<option value="0">Choose one</option>');
            var did = $("#edit_dist").data("id");
          $.each(data, function (index, element) {
                districtDropdown.append('<option value="' + element.d_id + '" ' + (element.d_id == did ? 'selected="true"' : "") + '>' + element.d_name + '</option>');
            });
            districtDropdown.trigger("change");
      },
      error: function(xhr, status, error) {
          console.error("Error fetching district data: " + error);
      }
  });
});//end state

$("#edit_dist").change(function() {
  var distId = $(this).val();	    
  // Make an AJAX request to get taluk data
  $.ajax({
      url: "AppController/getTaluk",
      type: "POST",
      data: { id: distId },
      dataType: "json",
      success: function(data) {
          // Populate Taluk dropdown
          var talukDropdown = $("#edit_taluk");
          talukDropdown.empty();
          talukDropdown.append('<option value="0">Choose one</option>');
            var tid = $("#edit_taluk").data("id");
          $.each(data, function(index, element) {
              talukDropdown.append('<option value="' + element.t_id + '" ' +(element.t_id == tid ? 'selected="true"' : "")+'>' + element.t_name + '</option>');
          });
            talukDropdown.trigger("change");
      },
      error: function(xhr, status, error) {
          console.error("Error fetching taluk data: " + error);
      }
  });
});

  var dtGram = $('#dtGram').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": true,
    "responsive": true,
    "columnDefs": [{ targets: [0], className: 'dt-center valign dt-w3' },
                  { targets: [1,2,3,4], className: 'dt-left valign dt-w20' },
                  {targets: [5], className: 'dt-center dt-w17 valign'}],
    dom: 'Bfrtip',
    "ajax": "AppController/dtGram",
    "order": [] 
});//Datatable View

// console.log(dtGram);
if ($.fn.DataTable.isDataTable('#dtGram')) {
    var dataTable = $('#dtGram').DataTable();
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
      var district = $("#dist").val();
      var taluk = $("#taluk").val();
      var gram = $("#gram").val();

        if(state == "") {
                $("#state").closest('.form-group').addClass('has-error');
                $("#state").after('<p class="text-danger error-text">State is required</p>');
        } else {
                $("#state").closest('.form-group').removeClass('has-error');
                $("#state").closest('.form-group').addClass('has-success');                   
        }
        if(district == "") {
          $("#dist").closest('.form-group').addClass('has-error');
          $("#dist").after('<p class="text-danger error-text">Distict is required</p>');
        } else {
                $("#dist").closest('.form-group').removeClass('has-error');
                $("#dist").closest('.form-group').addClass('has-success');                   
        }
        if(taluk == "") {
          $("#taluk").closest('.form-group').addClass('has-error');
          $("#taluk").after('<p class="text-danger error-text">Taluk is required</p>');
        } else {
          $("#taluk").closest('.form-group').removeClass('has-error');
          $("#taluk").closest('.form-group').addClass('has-success');                   
        }
        if(gram == "") {
          $("#gram").closest('.form-group').addClass('has-error');
          $("#gram").after('<p class="text-danger error-text">Gram is required</p>');
        } else {
          $("#gram").closest('.form-group').removeClass('has-error');
          $("#gram").closest('.form-group').addClass('has-success');                   
        }       

      if (state && district && taluk && gram) {

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
                  title: 'Gram added successfully!'
                });
              });
              // reset the form
              $("#addLinkageForm")[0].reset();
              $('#dtGram').DataTable().ajax.reload();
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
  $(document).on('click', '#delete_gram', function(e){ 
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
          url: 'AppController/delGram',
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
              $('#dtGram').DataTable().ajax.reload();
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
        url: 'AppController/getGram',
          type: 'post',
          data: {member_id : id},
          dataType: 'json',
          success:function(response) {
            $('#edit_state').val(response.s_id).trigger("change");
            $('#edit_state').data("id", response.s_id);
            $('#edit_dist').val(response.d_id).trigger("change");
            $('#edit_dist').data("id", response.d_id);
            $('#edit_taluk').val(response.t_id).trigger("change");
            $('#edit_taluk').data("id", response.t_id);
            $('#g_id').val(response.g_id);
            $('#edit_gram').val(response.g_name);
            $(".editModal").append('<input type="hidden" name="member_id" id="member_id" value="'+response.id+'"/>');
            $("#editLinkageForm").unbind('submit').bind('submit', function() {
              $(".text-danger").remove();
              var form = $(this);
              // validation
              var edit_gram = $("#edit_gram").val();
              if(edit_gram === ''){
                $("#edit_gram").closest('.form-group').addClass('has-error');
                  $("#edit_gram").after('<p class="text-danger error-text">Village is required</p>');
                } else {
                  $("#edit_gram").closest('.form-group').removeClass('has-error');
                  $("#edit_gram").closest('.form-group').addClass('has-success');                   
                }   

              if (edit_gram) {
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
                              title: 'Gram info updated successfully'
                          });
                          });
                          $('#dtGram').DataTable().ajax.reload();
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