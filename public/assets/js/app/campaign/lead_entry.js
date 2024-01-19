$(document).ready(function(){
    // Set tabindex to -1 for the readonly dropdowns
    $(".readonly-dropdown").attr("tabindex", "-1");

    var cid = $('#c_id').val();
    setTimeout(function(){
        $.ajax({
            url: 'AppController/getCampaign',
            type: 'GET',
            data: {member_id : cid},
            dataType: 'json',
            success: function(data) {
                console.log('Received data:', data);
                $('#gid').val(data.id);
                $('#c_name').val(data.campaign_name);
                $('#state').val(data.state).trigger("change");
                $('#state').data("id", data.state);
                $('#dist').val(data.district).trigger("change");
                $('#dist').data("id", data.district);
                $('#taluk').val(data.taluk).trigger("change");
                $('#taluk').data("id", data.taluk);
                $('#gp').val(data.gram).trigger("change");
                $('#gp').data("id", data.gram);
                $('#village').val(data.village).trigger("change");
                $('#village').data("id", data.village);
                $('#pin').val(data.pincode).trigger("change");
                $('#pin').data("id", data.pincode);  
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }, 500); 

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
	            var gpDropdown = $("#gp");
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

    $("#gp").change(function() {
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

    $("#village").change(function() {
	    var villageId = $(this).val();	    
	    // Make an AJAX request to get village data
	    $.ajax({
	        url: "AppController/getPin",
	        type: "POST",
	        data: { id: villageId },
	        dataType: "json",
	        success: function(data) {
	            // Populate District dropdown
	            var pinDropdown = $("#pin");
	            pinDropdown.empty();
	            pinDropdown.append('<option value="0">Choose one</option>');
                var pid = $("#pin").data("id");
	            $.each(data, function(index, element) {
	                pinDropdown.append('<option value="' + element.p_id + '" ' +(element.p_id == pid ? 'selected="true"' : "")+'>' + element.p_code + '</option>');
	            });
                pinDropdown.trigger("change");
	        },
	        error: function(xhr, status, error) {
	            console.error("Error fetching Pincode data: " + error);
	        }
	    });
	});//end village

    $('#state').select2();
    $('#dist').select2();
    $('#taluk').select2();
    $('#gp').select2();
    $('#village').select2();
    $('#pin').select2();
    
    

    $("#submitlead").on("click", function (e) {
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
	
// 	function validateForm() {
// 		var c_name = $("#c_name").val();
// 		var state = $("#state").val();
// 		var dist = $("#dist").val();
// 		var taluk = $("#taluk").val();
// 		var gp = $("#gp").val();
// 		var village = $("#village").val();
// 		var pin = $("#pin").val();
// 		var full_name = $("#full_name").val();
// 		var mobile_no = $("#mobile_no").val();
// 		var birth_date = $("#birth_date").val();
// 		var id_proof_type = $("#id_proof_type").val();
// 		var id_proof_no = $("#id_proof_no").val();
// 		var address_proof_type = $("#address_proof_type").val();
// 		var address_proof_no = $("#address_proof_no").val();
// 		if (c_name === "") {
// 			displayError($("#c_name"), "Please enter campaign name!");
// 			return false;
// 		}
// 		if (state === "0") {
// 			displayError($("#state"), "Please select state!");
// 			return false;
// 		}
// 		if (dist === "0") {
// 			displayError($("#dist"), "Please select district!");
// 			return false;
// 		}
// 		if (taluk === "0") {
// 			displayError($("#taluk"), "Please select taluk!");
// 			return false;
// 		}
// 		if (gp === "0") {
// 			displayError($("#gp"), "Please select gram panchayat!");
// 			return false;
// 		}
// 		if (village === "0") {
// 			displayError($("#village"), "Please select village!");
// 			return false;
// 		}
// 		if (pin === "0") {
// 			displayError($("#pin"), "Please select pincode!");
// 			return false;
// 		}
		
// 		if (full_name === "") {
// 			displayError($("#full_name"), "Please enter full name!");
// 			return false;
// 		}

// 		var fullNameRegex = /^[a-zA-Z\s\W]+$/;
// 		if (!fullNameRegex.test(full_name)) {
// 			displayError($("#full_name"), "Full name must contain only alphabets and special characters!");
// 			return false;
// 		}
// 		if (mobile_no === "") {
// 			displayError($("#mobile_no"), "Please enter mobile no!");
// 			return false;
// 		}

// 		var mobileNoRegex = /^\d{10}$/;
// 		if (!mobileNoRegex.test(mobile_no)) {
// 			displayError($("#mobile_no"), "Mobile number should be a maximum of 10 digits and contain only numbers!");
// 			return false;
// 		}

// 		var father_name = $("#father_name").val();
// 		if (father_name.trim() !== "") {
// 			var nameRegex = /^[a-zA-Z\s\W]+$/;
// 			if (!nameRegex.test(father_name)) {
// 				displayError($("#father_name"), "Father name should contain only alphabets and special characters!");
// 				return false;
// 			}
// 		}

// 		var mother_name = $("#mother_name").val();
// 		if (mother_name.trim() !== "") {
// 			if (!nameRegex.test(mother_name)) {
// 				displayError($("#mother_name"), "Mother name should contain only alphabets and special characters!");
// 				return false;
// 			}
// 		}

// 		var spouse_name = $("#spouse_name").val();
// 		if (spouse_name.trim() !== "") {
// 			if (!nameRegex.test(spouse_name)) {
// 				displayError($("#spouse_name"), "Spouse name should contain only alphabets and special characters!");
// 				return false;
// 			}
// 		}

// 		if (birth_date === "") {
// 			displayError($("#birth_date"), "Please enter date of birth!");
// 			return false;
// 		}
// 		if (id_proof_type === "0") {
// 			displayError($("#id_proof_type"), "Please select id proof type!");
// 			return false;
// 		}
// 		if (id_proof_no === "") {
// 			displayError($("#id_proof_no"), "Please enter id proof no!");		
// 			return false;
// 		}
// 		var idProofNoRegex = /^\d{12}$/;
// 		if (!idProofNoRegex.test(id_proof_no)) {
// 			displayError($("#id_proof_no"), "ID proof number should be exactly 12 digits and contain only numbers!");
// 			return false;
// 		}
// 		if (address_proof_type === "0") {
// 			displayError($("#address_proof_type"), "Please select address proof type!");
// 			return false;
// 		}
// 		if (address_proof_no === "") {
// 			displayError($("#address_proof_no"), "Please enter address proof no!");			
// 			return false;
// 		}
// 		var addressProofNoRegex = /^\d{12}$/;
// 		if (!addressProofNoRegex.test(address_proof_no)) {
// 			displayError($("#address_proof_no"), "Address proof number should be exactly 12 digits and contain only numbers!");
// 			return false;
// 		}
// 		return true;
// 	}
function validateForm() {
		var c_name = $("#c_name").val();
		var state = $("#state").val();
		var dist = $("#dist").val();
		var taluk = $("#taluk").val();
		var gp = $("#gp").val();
		var village = $("#village").val();
		var pin = $("#pin").val();
		if (c_name === "") {
			displayError($("#c_name"), "Please enter campaign name!");
			return false;
		}
		if (state === "0") {
			displayError($("#state"), "Please select state!");
			return false;
		}
		if (dist === "0") {
			displayError($("#dist"), "Please select district!");
			return false;
		}
		if (taluk === "0") {
			displayError($("#taluk"), "Please select taluk!");
			return false;
		}
		if (gp === "0") {
			displayError($("#gp"), "Please select gram panchayat!");
			return false;
		}
		if (village === "0") {
			displayError($("#village"), "Please select village!");
			return false;
		}
		if (pin === "0") {
			displayError($("#pin"), "Please select pincode!");
			return false;
		}
		
		var fullName = $("#full_name");
		var fullNameValue = fullName.val();
		var fullNameRegex = /^[a-zA-Z\s\W]+$/;
		if (fullNameValue.trim() === "") {
			displayError(fullName, "Please enter full name!");
			return false;
		} else if (!fullNameRegex.test(fullNameValue)) {
			displayError(fullName, "Full name must contain only alphabets, spaces, and special characters!");
			return false;
		}

		var mobileno = $("#mobile_no");
		var mobilenoValue = mobileno.val();
		var mobilenoRegex = /^\d{10}$/;
		if (mobilenoValue === "") {
			displayError(mobileno, "Please enter mobile no!");
			return false;
		} else if (!mobilenoRegex.test(mobilenoValue)) {
			displayError(mobileno, "Mobile number should be a maximum of 10 digits and contain only numbers!");
			return false;
		}
		
		var father_name = $("#father_name").val();
		if (father_name.trim() !== "") {
			var nameRegex = /^[a-zA-Z\s\W]+$/;
			if (!nameRegex.test(father_name)) {
				displayError($("#father_name"), "Father name should contain only alphabets and special characters!");
				return false;
			}
		}

		var mother_name = $("#mother_name").val();
		if (mother_name.trim() !== "") {
			if (!nameRegex.test(mother_name)) {
				displayError($("#mother_name"), "Mother name should contain only alphabets and special characters!");
				return false;
			}
		}

		var spouse_name = $("#spouse_name").val();
		if (spouse_name.trim() !== "") {
			if (!nameRegex.test(spouse_name)) {
				displayError($("#spouse_name"), "Spouse name should contain only alphabets and special characters!");
				return false;
			}
		}

		var birthdate = $("#birth_date");
		var birthdateValue = birthdate.val();
		var birthdateRegex = /^\d{2}-\d{2}-\d{4}$/;

		if (birthdateValue.trim() === "") {
			displayErrorForBirthdate(birthdate, "Please enter date of birth!");
			return false;
		} else if (!birthdateRegex.test(birthdateValue)) {
			displayErrorForBirthdate(birthdate, "Please enter correct date format (DD-MM-YYYY) for date of birth!");
			return false;
		} else {
			var momentDate = moment(birthdateValue, 'DD-MM-YYYY', true);
			var minDate = moment().subtract(60, 'years');
			var maxDate = moment().subtract(18, 'years');

			if (!momentDate.isValid() || momentDate.isBefore(minDate) || momentDate.isAfter(maxDate)) {
				displayErrorForBirthdate(birthdate, "Invalid date. Please enter a valid date of birth between 18 and 60 years ago!");
				return false;
			}
		}

		var id_proof_type = $("#id_proof_type").val();
		if (id_proof_type === "0") {
			displayError(id_proof_type, "Please select id proof type!");
			return false;
		}
		var id_proof_no = $("#id_proof_no").val();
		if (id_proof_no === "") {
			displayError(id_proof_no, "Please enter id proof no!");		
			return false;
		}
		if (id_proof_type === "3" && !/^[a-zA-Z0-9]{10}$/.test(id_proof_no)) {
			displayError($("#id_proof_no"), "For PAN card, ID proof number should be exactly 10 alphanumeric characters!");
			return false;
		} else if (id_proof_type === "4" && !/^[0-9]{12}$/.test(id_proof_no)) {
			displayError($("#id_proof_no"), "For Aadhar card, ID proof number should be exactly 12 digits and contain only numbers!");
			return false;
		}
		var address_proof_type = $("#address_proof_type").val();
		if (address_proof_type === "0") {
			displayError(address_proof_type, "Please select address proof type!");
			return false;
		}

		var address_proof_no = $("#address_proof_no").val();
		if (address_proof_no === "") {
			displayError(address_proof_no, "Please enter address proof no!");			
			return false;
		}
		if (address_proof_type === "2" && !/^[a-zA-Z0-9]{10}$/.test(address_proof_no)) {
			displayError($("#address_proof_no"), "For PAN card, ID proof number should be exactly 10 alphanumeric characters!");
			return false;
		} else if (address_proof_type === "3" && !/^[0-9]{12}$/.test(address_proof_no)) {
			displayError($("#address_proof_no"), "For Aadhar card, ID proof number should be exactly 12 digits and contain only numbers!");
			return false;
		}
		
		return true;
	}
	
// 	function displayError(element, message) {
// 		element.closest(".form-control").addClass("has-error");
// 		element.after('<p class="text-danger text-sm">' + message + '<br></p>');
// 		element.focus();
// 	}

    function displayError(element, message) {
		element.closest(".form-control").addClass("has-error");
		element.after('<p class="text-danger text-sm" colspan="11">' + message + '<br></p>');		
		element.focus();		
	}

	function displayErrorForBirthdate(element, message) {
		// Remove previous error classes and messages
		$(".form-control").removeClass("has-error").removeClass("has-success");
		$(".text-danger").remove();
	
		// Add the "has-error" class to the closest ancestor with the "form-group" class
		element.closest(".form-group").addClass("has-error");
	
		// Insert a paragraph element with the error message after the closest ancestor with the "form-group" class
		element.closest(".form-group").append('<p class="text-danger text-sm" style="margin-top: 5px;">' + message + '<br></p>');
	
		// Set focus on the element with the error
		element.focus();
	}
	
	function submitForm() {
		var form = $("#formLead");
	
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
						text: "Lead added successfully!",
						showConfirmButton: false,
						timer: 5000,
					});
					// reset the form
					window.location.href = "campaign_manage";
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
});//end doc ready function

function calculateAge() {
    var inputDate = $('#birth_date').val();
    
    // Check if the inputDate is a valid date
    if (!moment(inputDate, 'DD-MM-YYYY', true).isValid()) {
        // Handle the case where the input date is not valid
        console.log('Invalid date format. Please enter the date in DD-MM-YYYY format.');
        return;
    }

    var selectedDate = moment(inputDate, 'DD-MM-YYYY');
    var currentDate = moment();

    if (!selectedDate.isValid()) {
        // Handle the case where the parsed date is not valid
        console.log('Invalid date value');
        // You can add additional error handling or feedback to the user here
        return;
    }

    var age = currentDate.diff(selectedDate, 'years');

    // Update the value of the ageOutput text box
    $('#age').val(age);
}

Object.defineProperty(String.prototype, "capitalize", {
	value: function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	},
	enumerable: false,
});
$(function () {
    //Date picker    
    $('#birth_date').datetimepicker({
        format: 'DD-MM-YYYY',
		minDate: moment().subtract(60, 'years'),
		maxDate: moment().subtract(18, 'years')
    });
	// $('#birth_date').val('');
});