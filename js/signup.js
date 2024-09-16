

$(function() {
    

    $("form#signup").submit(function(e) {
        e.preventDefault();
        $.post(`${url}/signup`,JSON.stringify({
            username : $('input#username').val(),
            pwd : $('input#password').val(),
            first_name : $('input#first_name').val(),
            last_name : $('input#last_name').val(),
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