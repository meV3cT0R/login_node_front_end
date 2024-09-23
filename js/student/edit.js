$(function () {
  navbar()
  $('#form_container').append(
    $('<form></form>')
      .attr('id', 'student_detail_edit_form')
      .addClass('border px-5 pb-5 pt-1 shadow-lg rounded')
      .css({
        textTransform: 'capitalize'
      })
      .append(
        $('<div></div>').append(
          $('<h1></h1>')
            .text('Edit Student Detail')
            .addClass('text-secondary pt-3 py-4 text-center')
        )
      )
  )

  $.get(`${url}/faculty`, (dataFaculty, status) => {
    const facultyData = {}
    for (const key in dataFaculty) facultyData[dataFaculty[key].id] = dataFaculty[key].abbr
    const formConfig = {
      parent: '#student_detail_edit_form',
      fields: [
        [
          {
            name: 'firstName',
            label: 'first name',
            type: 'text'
          },
          {
            name: 'lastName',
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
            name: 'currentYear',
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
        ],
        [
          {
            name: 'imageHelper',
            type: 'div',
            element: () => {
              // const data = $("input#image").attr("data");
              // console.log("Image Helper input Element data",data);
              // if(data) {
              //     return $("<img></img>").attr("src",data).css({
              //       width:"200px",
              //       height:"200px"
              //     })
              // }
              return ''
            }
          }
        ]
      ]
    }

    console.log(formConfig)
    formGenerator(formConfig)
    const flatten = (
      arr,
      flattenedFields = [],
      dateFields = [],
      fileFields = [],
      radioFields = []
    ) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Array) {
          flatten(arr[i], flattenedFields, dateFields, fileFields, radioFields)
          continue
        }
        if (arr[i].type == 'date') {
          dateFields.push(arr[i].name)
          continue
        }
        if (arr[i].type == 'file') {
          fileFields.push(arr[i].name)
          continue
        }
        if (arr[i].type == 'radio') {
          radioFields.push(arr[i].name)
          continue
        }
        flattenedFields.push(arr[i].name)
      }
      return {
        flattenedFields,
        dateFields,
        fileFields,
        radioFields
      }
    }

    const { flattenedFields, dateFields, fileFields, radioFields } = flatten(
      formConfig.fields
    )

    console.log(flattenedFields)
    console.log(dateFields)
    console.log(fileFields)
    console.log(radioFields)

    const params = new URLSearchParams(window.location.search)

    $.ajax({
      type: 'get',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      url: `${url}/students?$filter=formData.formId eq ${params.get('id')}`
    }).done((data, status) => {
      data = data[0]
      console.log(data)
      for (const field of flattenedFields) {
        if (data[field] instanceof Date) console.log('Date')
        $(`#${field}`).val(data[field])
      }

      for (const dateField of dateFields) {
        $(`#${dateField}`).val(dateYMD(new Date(data[dateField])))
        console.log(`${dateField} value : `, $(`#${dateField}`).val())
      }

      for (const radioField of radioFields) {
        const selector = `input[name='${radioField}'][value='${data[radioField]}']`
        console.log(selector)
        console.log($(selector).attr('checked', 'checked'))
      }

      for (const fileField of fileFields) {
        console.log(data.files)
        $(`#${fileField}`).attr('data', data.files[0]?.fileData)
      }

      let genderValue = data.gender

      

      addImageHelper();

      $('input#gender').change(e => {
        genderValue = e.target.value
      })
      
      $('#student_detail_edit_form').submit(e => {
        e.preventDefault()
        const getVal = id => {
          return $(`input#${id}`).val()
        }

        const dataTobeSent ={
          id: data.id,
          firstName: $('input#firstName').val(),
          lastName: $('input#lastName').val(),
          gender: genderValue,
          email: $('input#email').val(),
          phone: $('input#phone').val(),
          dob: dateYMD(new Date(getVal('dob'))),
          faculty: $('select#faculty').val(),
          joinedOn: dateYMD(new Date(getVal('joinedOn'))),
          rollNo: getVal('rollNo'),
          currentYear: getVal('currentYear'),
          file: $('input#image').attr("data")?{
              fileName: "updatedImage",
              fileType : "jpeg",
              formFileId : data.files[0].formFileId,
              fileData : $('input#image').attr("data"),
          }:null,
          address: getVal('address'),
          country: getVal('country'),
          city: getVal('city')
        }
        console.log("Data To Be sent",dataTobeSent);
        $.ajax({
          url: `${url}/students/update`,
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          
          data: JSON.stringify(dataTobeSent),
          dataType: 'json',
          type: 'put'
        })
          .done(function (data, status) {
            window.open('/student/student_details.html', '_self')
          })
          .fail(async (data, status)=> {
            console.log("inside failed edit");
            console.log(data.responseJSON.message)
            let waiting = true;
            console.log("Waiting for buttons on modal to be clicked : ",waiting)
            const exited = await popup("Error",data?.responseJSON?.message?.name || data?.responseJSON?.message || "Something Went Wrong");
            waiting = false;
            console.log("button clicked on modals and waiting : ",waiting)

            console.log(exited);
          })
      })
    })
  })
})
