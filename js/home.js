$(function () {
  navbar()

  checkSecure(data => {
    console.log(data)
    $('#welcome_user').text(
      `Welcome, ${data.data.first_name} ${data.data.last_name}`
    )
    const vals = ['username', 'phone', 'firstName', 'lastName', 'gender']

    for (const val of vals) {
      $(`#${val}`).text(`${data.data[val]}`)
    }
    console.log(data.data.avatar)
    $(`#user_img`).append(
      $('<img>').attr('src', data.data.avatar).css({
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%'
      })
    )
  })
})
