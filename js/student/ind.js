$(() => {
  checkSecure(userData => {
    navbar();
    const params = new URLSearchParams(window.location.search)
    $.ajax({
      type: 'get',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      url: `${url}/students?$filter=formData.formId eq ${params.get('id')}`
    }).done(studentData => {
      console.log(studentData)
      if (studentData.length == 0)
        window.open('/student/student_details.html', '_self')

      studentData = studentData[0]
      const parent = $('<div></div>').css({
        width: '700px',
        display: 'flex',
        margin: '0px auto',
        border : "1px solid gray",
        padding : "20px 30px",
        borderRadius : "25px"
      })
      let studentImage = ''
      if (studentData.files.length > 0)
        studentImage = studentData.files[0].fileData
      const firstDiv = $('<div></div>')
        .css({
          width: '30%'
        })
        .append(
          $('<img>').attr('src', studentImage).css({
            width: '150px',
            height: '150px',
            objectFit: 'cover'
          })
        )

        const secondDivData = [
            {
                name : "Name",
                value  : `${studentData.firstName} ${studentData.lastName}`
            },
            {
                name : "Birthdate",
                value : dateYMD(new Date(studentData.dob))
            },
            {
                name : "Gender",
                value : `${studentData.gender}`
            },
            {
                name : "E-Mail",
                value : `${studentData.email}`
            },
            {
                name : "Address",
                value : studentData.address

            },
            {
                name : "Joined On",
                value : dateYMD(new Date(studentData.joinedOn))

            },
            {
                name : "Current Academic Year",
                value : studentData.currentYear
            }
        ]

      const secondDiv = $('<div></div>')
        .css({})
        

        for(const d of secondDivData)  {
            secondDiv.append(
                $('<div> </div>').addClass('row').append(
                $("<div></div>").addClass("col").append(
                    $("<span></span>").text(d.name).css({
                        fontWeight:"bold"
                    }),
                    
                    $("<span></span>").text(" : "),
                    $("<span></span>").text(d.value).css({
                        color : "rgba(0,0,0,0.5)",
                    }),
                )
            ))
        }
      parent.append(firstDiv)
      parent.append(secondDiv)
      $(document.body).append(parent)
    })
  })
})
