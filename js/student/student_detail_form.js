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
      [
        {
          name: 'first_name',
          label: 'first name',
          type: 'text'
        },
        {
          name: 'last_name',
          label: 'last name',
          type: 'text'
        }
      ],
      [
        {
          name: 'email',
          label: 'E-mail',
          type: 'email'
        }
      ],
      [
        {
          name: 'phone',
          label: 'Phone',
          type: 'text'
        },
        {
          name: 'dob',
          label: 'Date of Birth',
          type: 'date'
        }
      ],
      [
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
        },
        {
          name: 'faculty',
          label: 'Faculty',
          type: 'text'
        }
      ],
      [
        {
          name: 'college_name',
          label: 'College Name',
          type: 'text'
        },
        {
          name: 'college_year',
          label: 'college_year',
          type: 'text'
        }
      ],
      [
        {
          name: 'country',
          label: 'country',
          type: 'text'
        },
        {
          name: 'city',
          label: 'city',
          type: 'text'
        }
      ],
      [
        {
          name: 'address',
          label: 'address',
          type: 'text'
        }
      ],
      [
        {
          name: 'image',
          label: 'image',
          type: 'file',
          onchange: encodeImageFileAsURL
        }
      ]
    ]
  })

  let genderValue = 'male'
  $('input#gender').change(e => {
    genderValue = e.target.value
  })

  $('form#student_detail_form').submit(e => {
    e.preventDefault()

    const getVal = id => {
      return $(`input#${id}`).val()
    }
    $.ajax({
      url: `${url}/students/create`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        first_name: $('input#first_name').val(),
        last_name: $('input#last_name').val(),
        phone: $('input#phone').val(),
        email: $('input#email').val(),
        gender: genderValue,
        dob: getVal('dob'),
        faculty: getVal('faculty'),
        college_name: getVal('college_name'),
        college_year: getVal('college_year'),
        image: $('input#image').attr('data'),
        address: getVal('address'),
        country: getVal('country'),
        city: getVal('city')
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
