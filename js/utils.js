const links = [
    {
        link : "/user/home.html",
        display : "home"
    },
    {
        link : "/user/edit.html",
        display : "edit"
    },
    {
        link : "/user/change_password.html",
        display : "change password"
    }
]

function navbar() {
    $(document.body).prepend($("<div> </div>").attr("id","navbar").css("marginBottom","20px"));
    for(const link of links) {
        $("#navbar").append(
            $("<a> </a>").css({
                padding:"5px 10px"
            }).text(link.display).attr("href",link.link)
        )
    }
    $("#navbar").after(
        $("<button></button>").css({
            marginBottom : "20px"
        }).text("logout").click(
            function() {
                localStorage.removeItem("token");
                window.open("/","_self")
            }
        )
    )
}

function checkSecure (success=(d)=>{}) {
  $.ajax({
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    url: `${url}/secure_endpoint`,
    dataType: `json`
  }).done(function (data, status) {
    console.log(data)
    console.log(status)
    if (status != 'success') {
      console.log('Something went wrong')
      return
    }
    success(data)
  }).fail(function(data) {
        window.open("/","_self");
  })
}


