$(function() {
    $("form#signup").submit(function(e) {
        e.preventDefault();
        $.post(`${url}/signup`,JSON.stringify({
            name : `${$("input#first_name").val()} ${$("input#last_name").val()}`,
            username : $('input#username').val(),
            pwd : $('input#password').val(),
            phone : $('input#phone').val(),
            gender : $('input[name="gender"]').val(),
            image : $('input#image').attr("data")
        })).done(function(data,status) {
            window.open("/","_self");
        }).fail(function(data,status) {
            console.log(data.responseJSON.message)
            alert("Something went wrong")
        })
    })
})