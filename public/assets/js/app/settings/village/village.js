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

  $("#taluk").change(function() {
    var talukId = $(this).val();	    
    // Make an AJAX request to get taluk data
    $.ajax({
        url: "AppController/getGp",
        type: "POST",
        data: { id: talukId },
        dataType: "json",
        success: function(data) {
            // Populate District dropdown
            var gpDropdown = $("#gram");
            gpDropdown.empty();
            gpDropdown.append('<option value="0">Choose one</option>');
              var gid = $("#gp").data("id");
            $.each(data, function(index, element) {
                gpDropdown.append('<option value="' + element.g_id + '" ' +(element.g_id == gid ? 'selected="true"' : "")+'>' + element.g_name + '</option>');
            });
              gpDropdown.trigger("change");
        },
        error: function(xhr, status, error) {
            console.error("Error fetching gp data: " + error);
        }
    });
});//end taluk

  $("#gram").change(function() {
    var gpId = $(this).val();	    
    // Make an AJAX request to get gp data
    $.ajax({
        url: "AppController/getVillage",
        type: "POST",
        data: { id: gpId },
        dataType: "json",
        success: function(data) {
            // Populate District dropdown
            var villageDropdown = $("#village");
            villageDropdown.empty();
            villageDropdown.append('<option value="0">Choose one</option>');
              var vid = $("#village").data("id");
            $.each(data, function(index, element) {
                villageDropdown.append('<option value="' + element.v_id + '" ' +(element.v_id == vid ? 'selected="true"' : "")+'>' + element.v_name + '</option>');
            });
              villageDropdown.trigger("change");
        },
        error: function(xhr, status, error) {
            console.error("Error fetching village data: " + error);
        }
    });
});//end gp

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
});//end dist

$("#edit_taluk").change(function() {
  var talukId = $(this).val();	    
  // Make an AJAX request to get taluk data
  $.ajax({
      url: "AppController/getGp",
      type: "POST",
      data: { id: talukId },
      dataType: "json",
      success: function(data) {
          // Populate District dropdown
          var gpDropdown = $("#edit_gram");
          gpDropdown.empty();
          gpDropdown.append('<option value="0">Choose one</option>');
            var gid = $("#edit_gram").data("id");
          $.each(data, function(index, element) {
              gpDropdown.append('<option value="' + element.g_id + '" ' +(element.g_id == gid ? 'selected="true"' : "")+'>' + element.g_name + '</option>');
          });
            gpDropdown.trigger("change");
      },
      error: function(xhr, status, error) {
          console.error("Error fetching gp data: " + error);
      }
  });
});//end taluk

$("#edit_gram").change(function() {
  var gpId = $(this).val();	    
  // Make an AJAX request to get gp data
  $.ajax({
      url: "AppController/getVillage",
      type: "POST",
      data: { id: gpId },
      dataType: "json",
      success: function(data) {
          // Populate District dropdown
          var villageDropdown = $("#edit_village");
          villageDropdown.empty();
          villageDropdown.append('<option value="0">Choose one</option>');
            var vid = $("#edit_village").data("id");
          $.each(data, function(index, element) {
              villageDropdown.append('<option value="' + element.v_id + '" ' +(element.v_id == vid ? 'selected="true"' : "")+'>' + element.v_name + '</option>');
          });
            villageDropdown.trigger("change");
      },
      error: function(xhr, status, error) {
          console.error("Error fetching village data: " + error);
      }
  });
});//end gp
  var dtVillage = $('#dtVillage').DataTable({
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
    "ajax": "AppController/dtVillage",
    "order": [] 
});//Datatable View

// console.log(dtVillage);
if ($.fn.DataTable.isDataTable('#dtVillage')) {
    var dataTable = $('#dtVillage').DataTable();
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
      var village = $("#village").val();
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
        if(village == "") {
          $("#village").closest('.form-group').addClass('has-error');
          $("#village").after('<p class="text-danger error-text">Village is required</p>');
        } else {
          $("#village").closest('.form-group').removeClass('has-error');
          $("#village").closest('.form-group').addClass('has-success');                   
        }     

      if (state && district && taluk && gram && village) {

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
                  title: 'Village added successfully!'
                });
              });
              // reset the form
              $("#addLinkageForm")[0].reset();
              $('#dtVillage').DataTable().ajax.reload();
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
  $(document).on('click', '#delete_village', function(e){ 
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
          url: 'AppController/delVillage',
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
              $('#dtVillage').DataTable().ajax.reload();
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
        url: 'AppController/getVillages',
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
            $('#edit_gram').val(response.g_id).trigger("change");
            $('#edit_gram').data("id", response.g_id);
            $('#v_id').val(response.v_id);
            $('#edit_village').val(response.v_name);
            $(".editModal").append('<input type="hidden" name="v_id" id="v_id" value="'+response.v_id+'"/>');
            $("#editLinkageForm").unbind('submit').bind('submit', function() {
            $(".text-danger").remove();
            var form = $(this);
            // validation
            var edit_village = $("#edit_village").val();
             if(edit_village === ''){
              $("#edit_village").closest('.form-group').addClass('has-error');
                $("#edit_village").after('<p class="text-danger error-text">Village is required</p>');
              } else {
                $("#edit_village").closest('.form-group').removeClass('has-error');
                $("#edit_village").closest('.form-group').addClass('has-success');                   
              }   

            if (edit_village) {
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
                        title: 'Village info updated successfully'
                    });
                    });
                    $('#dtVillage').DataTable().ajax.reload();
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