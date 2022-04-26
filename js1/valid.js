$(document).ready(function() {

    // Custom method to validate username
    $.validator.addMethod("usernameRegex", function(value, element) {
        return this.optional(element) || regex_first_last_name.test(value);
    }, "Name must be more than 2 characters long, without special characters or spaces");

    $.validator.addMethod("lastusernameRegex", function(value, element) {
        return this.optional(element) || regex_first_last_name.test(value);
    }, "Last name must be more than 2 characters long, without special characters or spaces");

    $.validator.addMethod("passwordRegex", function(value, element) {
        return this.optional(element) || /[a-z]/.test(value) && /[0-9]/.test(value) && /[A-Z]/.test(value) && /^[0-9A-Za-z]+$/.test(value);
    }, 'Password must be between 8-12 characters in length, including letters (A-Z, a-z) and numbers (0-9). Without any special symbols (^@()#*+/\\"?!=.{}~`&) and spaces');

    $.validator.addMethod("phoneRegex", function(value, element) {
        return this.optional(element) || /^(\d[- ]?){7,11}$/.test(value);
    }, "The phone must be from 7 to 11 characters, without special characters");


    $(function() {
        var form = $("#myform1")
        form.validate({
            onfocusout: function(element) {
                if (this.currentElements.length != 0 && this.currentElements[0].name == "email") {
                    rebuidEmail($(this.currentElements[0]))
                }
                this.element(element);
                // $('[name="' + element.name + '"]').val(element.value);
            },
            onkeyup: function(element) {
                $(element).valid()
                $('[name="' + element.name + '"]').val(element.value);
            },


            rules: {
                first_name: {
                    required: true,
                    usernameRegex: true,
                    minlength: 2,
                    maxlength: 60,
                },
                last_name: {
                    required: true,
                    lastusernameRegex: true,
                    minlength: 2,
                    maxlength: 60,
                },
                password: {
                    required: true,
                    passwordRegex: true,
                    minlength: 8,
                    maxlength: 12,
                },
                email: {
                    required: true,
                    email: true,

                },
                phone: {
                    phoneRegex: true,
                    required: true,
                }


            },
            messages: {
                first_name: {
                    required: "The first name field is required",
                    minlength: "The first name must be at least 2 characters",
                    maxlength: "First name can be a maximum of 25 characters",
                },

                last_name: {
                    required: "The last name field is required",
                    minlength: "The last name must be at least 2 characters",
                    maxlength: "Surname can be a maximum of 25 characters",
                },
                password: {
                    required: "The password field is required",
                    minlength: "The password must be at least 8 characters",
                    maxlength: "The password may not be greater than 12 characters",
                },
                email: {
                    required: "The email field is required",
                    email: "The email must be a valid address",
                },
                phone: {
                    required: "The phone number field is required",
                }

            },
            submitHandler: function(form, event) {
                $('.prelouder').show();
                event.preventDefault();
                $("input[name='first_name']").each(function() {
                    $(this).val($(this).val().substr(0, 60).replace(/[.-]/g, ' ').replace(/\s\s+/g, ' '))
                });
                $("input[name='last_name']").each(function() {
                    $(this).val($(this).val().substr(0, 60).replace(/[.-]/g, ' ').replace(/\s\s+/g, ' '))
                });
                var msg = $(form).serialize();
                var linkAdress = makeSendAdress();

                const urlParams = new URLSearchParams(window.location.search);

                if (urlParams.get('adv') === 'aivix') {
                    form.submit();
                    return;
                }

                $('.form-error').remove();
                $('.prelouder').show();

                $.ajax({
                    type: "POST",
                    url: form.action,
                    data: msg,
                    dataType: "json",
                    success: function(data, textStatus, xhr) {
                        $('.next').click(function() {
                            if (form.valid() === true) {
                                if ($('.step-2').is(":visible")) {
                                    $('.step-2').hide();
                                    $('.step-3').show();
                                }
                            }
                        })

                        if (data.redirect) {
                            window.location.href = data.redirect;
                        }
                    },
                    error: function(error) {
                        const errorMsg = error.responseJSON ? .messages[0] || 'Something went wrong'
                        $(form).prepend(`<p class="form-error" style="background: #D42F2F; color: white; padding: 10px;">${errorMsg}</p>`);
                    },
                    complete: function() {
                        $('.prelouder').hide();
                    },
                });
            }
        });
    });

});

// function makeSendAdress() {
//     var protocol = location.protocol;
//     var tmp = location.hostname.replace(/[a-z]{2}\./, '');
//     tmp = protocol + '//cabinet.' + tmp + '/api/register';
//     return tmp;
// }