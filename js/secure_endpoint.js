$(function() {
    $(document.body).prepend(
        $("<button></button>").text("logout").click(
            function() {
                localStorage.removeItem("token");
                window.open("/","_self")
            }
        )
    )
    $.ajax({
        headers : {
            "authorization" : `Bearer ${localStorage.getItem("token")}`,
        },
        url : `${url}/secure_endpoint`,
        dataType : `json`
    }).done(function(data,status) {
        console.log(data)
        console.log(status)
        if(status!="success") {
            console.log("Something went wrong");
            return;
        }
        $("#root").append(
            $("<h1> </h1>").text(data.message)
        )
    })

})