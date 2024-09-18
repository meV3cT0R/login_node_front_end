$(function () {
  navbar()
  $('#form_container').append(
    $('<form></form>')
      .attr('id', 'student_detail_form')
      .addClass('border px-5 pb-5 pt-1 shadow-lg rounded')
      .css({
        textTransform: 'capitalize'
      }).append(
        $("<div></div>").append(
          $("<h1></h1>").text("Student Detail Form").addClass("text-secondary pt-3 py-4 text-center")
        )
      )
  )

  $.get(`${url}/faculty`, (data, status) => {
    const facultyData = {}
    for(const key in data) 
      facultyData[data[key].id] = data[key].abbr
    
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
            type: 'select',
            options: facultyData
          }
        ],
        [
          {
            name: 'rollNo',
            label: 'Roll No.',
            type: 'text'
          },
          {
            name: 'current_year',
            label: 'Current academic year',
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
          },
          {
            name: 'joinedOn',
            label: 'joined on',
            type: 'date'
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
          firstName: $('input#first_name').val(),
          lastName: $('input#last_name').val(),
          gender: genderValue,
          email: $('input#email').val(),
          phone: $('input#phone').val(),
          dob: getVal('dob'),
          faculty: $('select#faculty').val(),
          joinedOn: getVal('joinedOn'),
          rollNo: getVal('rollNo'),
          currentYear: getVal('current_year'),
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
})
