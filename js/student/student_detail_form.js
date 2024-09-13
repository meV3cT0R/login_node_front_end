$(function () {
  navbar()
  $('#form_container').append(
    $('<form></form>')
      .attr('id', 'student_detail_form')
      .addClass('border px-5 py-5 shadow-lg rounded')
      .css({
        textTransform: 'capitalize'
      })
  )

  formGenerator({
    parent: '#student_detail_form',
    fields: [
      {
        name: 'first_name',
        label: 'first name',
        type: 'text'
      },
      {
        name: 'last_name',
        label: 'last name',
        type: 'text'
      },
      {
        name: 'email',
        label: 'E-mail',
        type: 'email'
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'text'
      },
      {
        name: 'dob',
        label: 'Date of Birth',
        type: 'date'
      },
      {
        name: 'gender',
        label: 'Gender',
        type: 'radio',
        values: [
          {
            label: 'male',
            value: 'male'
          },
          {
            label: 'female',
            value: 'female'
          }
          
        ]
      }
    ]
  })

  let genderValue = "male";
  $("input#gender").change((e)=>{
        genderValue = e.target.value;
  })

  $('form#student_detail_form').submit(e => {
    e.preventDefault()

    $.ajax({
      url: `${url}/student/create`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        first_name: $('input#first_name').val(),
        last_name: $('input#last_name').val(),
        phone: $('input#phone').val(),
        email: $('input#email').val(),
        gender: genderValue
      }),
      dataType: 'json',
      type: 'post'
    })
      .done(function (data, status) {
        window.open('/user/home.html', '_self')
      })
      .fail(function (data, status) {
        console.log(data.responseJSON.message)
        alert('Something went wrong')
      })
  })
})
