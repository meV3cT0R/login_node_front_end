$(function() {
    navbar();

    checkSecure((data)=>{
        console.log(data);
        $('input#username').val(data.data.username)
        $('input#first_name').val(data.data.first_name)
        $('input#last_name').val(data.data.last_name)
        $('input#phone').val(data.data.phone)
        const gender = data.data.gender
        if(gender=="male") $('input[type="radio"][value="male"]').attr("checked","true");
        else  $('input[type="radio"][value="female"]').attr("checked","true");


        let genderToBeSent =gender;
        $('input[name="gender"]').change(function(e){
            genderToBeSent = e.target.value;
            
        })
        $("form#editUser").submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                headers : {
                    "Content-Type" : "application/json",
                    "authorization" : `Bearer ${localStorage.getItem("token")}`
                },
                url :`${url}/edit`,
                data : JSON.stringify({
                    id : data.data.id,
                    username : $('input#username').val(),
                    first_name : $('input#first_name').val(),
                    last_name : $('input#last_name').val(),
                    phone : $('input#phone').val(),
                    gender : genderToBeSent,
                })

            }).done(function(data) {
                console.log("successfully updated user");
                window.open("/user/home.html","_self")
            }).fail(function(data) {
                console.log("user update failed");

            })
        })
    });
})