$(function () {
  navbar()

  checkSecure(data => {
    console.log(data)
    $('input#username').val(data.data.username)
    $('input#firstName').val(data.data.firstName)
    $('input#lastName').val(data.data.lastName)
    $('input#phone').val(data.data.phone)
    $('input#avatar').attr("data",data.data.avatar);
    const gender = data.data.gender
    if (gender == 'male')
      $('input[type="radio"][value="male"]').attr('checked', 'true')
    else $('input[type="radio"][value="female"]').attr('checked', 'true')


    addImageHelper("avatar");
    let genderToBeSent = gender
    $('input[name="gender"]').change(function (e) {
      genderToBeSent = e.target.value
    })
    $('form#editUser').submit(function (e) {
      e.preventDefault()

      $.ajax({
        type: 'put',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        url: `${url}/edit`,
        data: JSON.stringify({
          userId: data.data.userId,
          username: $('input#username').val(),
          firstName: `${$('input#firstName').val()}`,
          lastName: `${$('input#lastName').val()}`,
          phone: $('input#phone').val(),
          gender: genderToBeSent,
          avatar: $('input#avatar').attr('data')
          
        })
      })
        .done(function (data) {
          console.log('successfully updated user')
          window.open('/user/home.html', '_self')
        })
        .fail(function (data) {
          console.log('user update failed')
        })
    })
  })
})
