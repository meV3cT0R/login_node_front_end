$(function() {
    $("form#signup").submit(function(e) {
        e.preventDefault();
        $.post(`${url}/signup`,JSON.stringify({
            firstName : $("input#first_name").val(),
            lastName :  $("input#last_name").val(),
            username : $('input#username').val(),
            password : $('input#password').val(),
            phone : $('input#phone').val(),
            gender : $('input[name="gender"]').val(),
            avatar : $('input#image').attr("data"),
            dob : $('input#dob').val(),
            email : $('input#email').val(),
            address : $('input#address').val(),
        })).done(function(data,status) {
            window.open("/","_self");
        }).fail(function(data,status) {
            console.log(data.responseJSON.message)
            alert("Something went wrong")
        })
    })
})