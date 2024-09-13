$(function() {
    $(document.body).prepend(
        $("<button></button>").text("logout").click(
            function() {
                localStorage.removeItem("token");
                window.open("/","_self")
            }
        )
    )
    checkSecure((data)=> {
        $("#root").append(
            $("<h1> </h1>").text(data.message)
        )
    
    })
})