$(document).ready(function(){
    var dtStateRoute = 'dtState';
    var dtState = $('#dtState').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": true,
        "responsive": true,
        "columnDefs": [
            { targets: [0], className: 'dt-center valign dt-w4' },
            { targets: [1], className: 'dt-left valign dt-w20' },
            { targets: [2,3], className: 'dt-center valign dt-w20' },
            { targets: [4,5], className: 'dt-center dt-w18 valign' }
        ],
        dom: 'Bfrtip',
        "ajax": dtStateRoute,
        "order": [] 
    });
       //To Select the id of member to delete
       $(document).on('click', '#delete_state', function(e){ 
        var memberid = $(this).data('id');
        SwalDelete(memberid);
        e.preventDefault();
    });
});

  //Delete Swal popup
  function SwalDelete(memberid) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: 'deleteState',
                    type: 'GET',
                    data: { id: memberid },
                    dataType: 'json'
                })
                .done(function(response){
                    Swal.fire(
                          'Deleted!',
                          response.messages,
                          'success'
                    );
                    $('#dtState').DataTable().ajax.reload();
                })
                .fail(function(){
                 swal.fire('Oops...', 'Something went wrong !', 'error');
                });
            });
        },
        allowOutsideClick: false
    })

}

$("#submit").on("click", function (e) {
    e.preventDefault();

    clearErrors();

    if (validateForm()) {
        submitForm();
    }
});

function clearErrors() {
    $(".form-control").removeClass("has-error").removeClass("has-success");
    $(".text-danger").remove();
}

function validateForm() {
    var country_name = $("#country_name").val();
    var state_name = $("#state_name").val();
    var state_short_name = $("#state_short_name").val();
    var state_code = $("#state_code").val();

    if (country_name === "0") {
        displayError($("#country_name"), "Please select country!");
        return false;
    }

    if (state_name === "") {
        displayError(id_proof_no, "Please enter state name!");		
        return false;
    }

    return true;
}

function displayError(element, message) {
    element.closest(".form-control").addClass("has-error");
    element.after('<p class="text-danger text-sm" colspan="11">' + message + '<br></p>');		
    element.focus();		
}

function submitForm() {
    var form = $("#formState");
    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: form.serialize(),
        dataType: "json",
        success: function (response) {
            clearErrors();	
            if (response.success == true) {
                Swal.fire({
                    icon: "success",
                    title: "Good Job!",
                    text: "State added successfully!",
                    showConfirmButton: false,
                    timer: 5000,
                });
                // reset the form
                window.location.href = "state";
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Ooops...",
                    text: response.messages,
                    showConfirmButton: false,
                    timer: 5000,
                    showClass: { popup: "animate__animated animate__fadeInDown" },
                    hideClass: { popup: "animate__animated animate__fadeOutUp" },
                });
            }
        },
        error: function () {
            return false;
        }
    });
}


