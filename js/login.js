$(function () {
  function clearError (selector) {
    $(selector).keydown(function (e) {
      $('#login_error').text('')
    })
  }
  clearError("form div input")

  $('form#login').submit(function (e) {
    e.preventDefault()
    console.log('hello')
    $.post(
      `${url}/login`,
      JSON.stringify({
        username: $('input#username').val(),
        pwd: $('input#password').val()
      }),
      function (data, status, xhr) {
        if(status!="success") return $('#login_error').text("Something went wrong");
        localStorage.setItem("token",data.token);
        window.open("/user/home.html","_self");
      }
    ).fail(function (data) {
      $('#login_error').text(data.responseJSON.message)
    })
  })
})
