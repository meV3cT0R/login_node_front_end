$(() => {
  navbar()

  $('#table_container').append(
    $('<table></table>')
      .attr('id', 'table')
      .addClass('table table-striped border')
  )

  const cols = {
    rollNo: 'Roll No.',
    firstName: 'First Name',
    lastName: 'Last Name',
    currentYear: 'College Year'
  }

  const depCols = {
    faculty: 'Faculty'
  }

  const extraCols = [
    {
      head: 'Actions',
      element: (id, roles) => {
        const parent = $('<div></div>').addClass(
          'd-flex justify-content-center'
        )
        const editButton = $('<div></div>')
          .addClass('')
          .append(
            $('<a></a>')
              .text('edit')
              .addClass('btn btn-outline-success')
              .attr('href', `/student/edit.html?id=${id}`)
          )

        const deleteButton = $('<div></div>')
          .css({
            marginLeft: '10px'
          })
          .append(
            $('<button></button>')
              .text('delete')
              .addClass('btn btn-danger')
              .click(e => {
                e.preventDefault()
                $.ajax({
                  type: 'delete',
                  url: `${url}/students/delete`,
                  data: JSON.stringify({
                    id
                  }),
                  headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                })
                  .done((data, status) => {
                    window.open('/student/student_details.html', '_self')
                  })
                  .fail(async data => {
                    console.log(data)
                    await popup(
                      'Error',
                      data?.responseJSON?.message?.name ||
                        data?.responseJSON?.message ||
                        'Something Went Wrong'
                    )
                  })
              })
          )
        const viewButton = $('<div></div>').append(
          $('<a></a>')
            .text('view more')
            .addClass('btn btn-outline-primary')
            .attr('href', `/student/ind.html?id=${id}`)
        )

        if (roles == 'editor' || roles == 'admin') {
          parent.append(editButton, deleteButton)
        } else {
          parent.append(viewButton)
        }
        return parent
      }
    }
  ]

  $('#table_container table').append(
    $('<thead></thead>').append($('<tr></tr>').addClass('text-center'))
  )

  for (const key of Object.keys(cols)) {
    $('#table_container table thead tr').append(
      $('<th></th>').text(cols[key]).attr('scope', 'col')
    )
  }
  for (const key of Object.keys(depCols)) {
    $('#table_container table thead tr').append(
      $('<th></th>').text(depCols[key]).attr('scope', 'col')
    )
  }
  for (const col of extraCols) {
    $('#table_container table thead tr').append(
      $('<th></th>').text(col.head).attr('scope', 'col')
    )
  }

  checkSecure(userData => {
    if (userData.data.roles != 'viewer')
      $(document.body).append(
        $('<a></a>')
          .attr('href', '/student/student_detail_form.html')
          .addClass('fab bg-success text-white text-decoration-none text-white')
          .append($('<div></div>').text('+'))
      )
    $.ajax({
      type: 'get',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      url: `${url}/students`,
      dataType: 'json'
    })
      .done((data, status) => {
        console.log(data)
        $.get(`${url}/faculty`, (faculty, status) => {
          console.log(faculty)
          deps = {}
          deps['faculty'] = faculty
          $('#table_container table').append($('<tbody></tbody>'))

          for (const key of Object.keys(data)) {
            const tr = $('<tr></tr>').addClass('text-center')
            for (const col in cols) {
              tr.append($('<td></td>').text(data[key][col])).addClass(
                'align-middle'
              )
            }

            for (const col in depCols) {
              const val = Object.entries(deps[col]).find(([k, v]) => {
                console.log(v)
                console.log(data[key][col])
                console.log(data[key][col] == v.id)
                return v.id == data[key][col]
              })
              tr.append(
                $('<td></td>').text((val && val[1].abbr) || '-')
              ).addClass('align-middle')
            }

            for (const col of extraCols) {
              tr.append(
                $('<td></td>').append(
                  col.element(data[key].formId, userData.data.roles)
                )
              )
            }
            $('#table_container table tbody').append(tr)
          }
        })
      })
      .fail((data, status) => {
        console.log(data)
      })
  })
})
