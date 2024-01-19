$(document).ready(function(){
    var dtCityRoute = 'dtCity';
    var dtCity = $('#dtCity').DataTable({
        "paging" : true,
        "lengthChange" : true,
        "searching" : true,
        "ordering" : true,
        "info" : true,
        "autoWidth" : true,
        "responsive" : true,
        "columnDefs" : [
            { targets: [0], className: 'dt-center valign dt-w4'},
            { targets: [1,2,3], className: 'dt-center valign dt-w18'},
            { targets: [4,5], className: 'dt-center valign dt-w15'},
            { targets: [6], className: 'dt-center valign dt-w12'},
        ],
        dom: 'Bfrtip',
        "ajax" : dtCityRoute,
        "order" : []
    });

    $('#state_name').select2();

    // Your code for handling country change
    $("#country_name").change(function() {
        var countryId = $(this).val();
        var getStateList = baseUrl + '/getStateList';
        $("#state_name").html('');
        $.ajax({
            url: getStateList,
            type: "get",
            data: { id: countryId },
            dataType: "json",
            success: function(data) {
                var stateDropdown = $("#state_name");
                stateDropdown.empty();
                stateDropdown.html('<option value="0">Choose one</option>');

                var did = $("#state_name").data("id");
                $.each(data, function (index, element) {
                    stateDropdown.append('<option value="' + element.id + '" ' + (element.id == did ? 'selected="true"' : "") + '>' + element.state_name + '</option>');
                });

                // Trigger change event after setting options
                stateDropdown.trigger("change");
            },
            
            error: function(xhr, status, error) {
                console.error("Error fetching state data: " + error);
            }
        });
    });

    // Use the select2 event to set the value after initialization
    $('#state_name').on('select2:select', function (e) {
        // Get the selected value
        var selectedValue = e.params.data.id;

        // Set the value programmatically
        $('#state_name').val(selectedValue).trigger('change');
    });

    $(document).on('click', '#delete_city', function(e){ 
        var memberid = $(this).data('id');
        SwalDelete(memberid);
        e.preventDefault();
    });

    

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
        var city_name = $("#city_name").val();
        var state_short_name = $("#state_short_name").val();
        var state_code = $("#state_code").val();
    
        if (country_name === "0") {
            displayError($("#country_name"), "Please select country!");
            return false;
        }
    
        if (state_name === "") {
            displayError($("#state_name"), "Please enter state name!");		
            return false;
        }
    
        if (city_name === "") {
            displayError($("#city_name"), "Please enter city name!");		
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
        var form = $("#formCity");
        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: form.serialize(),
            dataType: "json",
            success: function (response) {
                console.log(response,'response');
                clearErrors();	
                if (response.success == true) {
                    Swal.fire({
                        icon: "success",
                        title: "Good Job!",
                        text: "City added successfully!",
                        showConfirmButton: false,
                        timer: 5000,
                    });
                    // reset the form
                    window.location.href = "city";
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

    if (cid) {
        var editDataUrl = $('#upurl').data('edit-data-url');
        var cidValue = $('#cid').val();
        var listData = baseUrl+"/city";
    
        // Optional: Check if cidValue is defined and not empty
        if (cidValue) {
            $.ajax({
                url: editDataUrl,
                type: "get",
                data: { id: cidValue },
                dataType: "json",
                success: function(data) {
                    console.log(data.state_name, 'data');
                    $('#cid').val(data.id);
                    $('#country_name').val(data.country_name);
                    $('#state_name').val(data.state_name).trigger("change");
                    $('#state_name').data("id", data.state_name);
                    $('#city_name').val(data.city_name);
                    $('#city_short_name').val(data.city_short_name);
                    $('#city_code').val(data.city_code);
                    $("#formUpdateCity").submit(function() {
                        $(".text-danger").remove();
                        var form = $(this);
                        console.log(form, 'form');
                    
                        // Validation
                        var stateNameInput = $("#state_name");
                        var state_name = stateNameInput.val();
                    
                        if (state_name === '') {
                            stateNameInput.closest('.form-group').addClass('has-error')
                                .append('<p class="text-danger error-text">State is required</p>');
                        } else {
                            stateNameInput.closest('.form-group').removeClass('has-error').addClass('has-success');
                        }
                    
                        if (state_name) {
                            $.ajax({
                                url: form.attr('action'),
                                type: form.attr('method'),
                                data: form.serialize(),
                                dataType: 'json',
                                success: function (response) {
                                    console.log(response, 'response');
                                    clearErrors();
                                    if (response.success) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Good Job!",
                                            text: "City Updated successfully!",
                                            showConfirmButton: true,
                                        });
                                        // Reset the form
                                        $('#dtCity').DataTable().ajax.reload();
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Ooops...",
                                            text: response.messages,
                                            showConfirmButton: true,
                                            showClass: { popup: "animate__animated animate__fadeInDown" },
                                            hideClass: { popup: "animate__animated animate__fadeOutUp" },
                                        });
                                    }
                                } // /success
                            }); // /ajax
                        }
                        return false;
                    });
                    
                    function clearErrors() {
                        $(".form-group").removeClass("has-error has-success");
                        $(".text-danger").remove();
                    }
                     
                },
                error: function(xhr, status, error) {
                    console.error("Error:", error);
                }
            });
        } else {
            console.error("cidValue is undefined or empty");
        }
    }

})
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
                    url: 'deleteCity',
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
                    $('#dtCity').DataTable().ajax.reload();
                })
                .fail(function(){
                 swal.fire('Oops...', 'Something went wrong !', 'error');
                });
            });
        },
        allowOutsideClick: false
    })

}


