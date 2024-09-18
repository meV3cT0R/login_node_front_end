$(() => {
  navbar()

  $('#table_container').append($('<table></table>').attr('id', 'table').addClass("table table-striped"))

  const cols = {
    rollNo: 'Roll No.',
    firstName: 'First Name',
    lastName: 'Last Name',
    faculty: 'Faculty',
    currentYear: 'College Year'
  }

  $('#table_container table').append(
    $('<thead></thead>').append($('<tr></tr>'))
  )

  for (const key of Object.keys(cols)) {
    $('#table_container table thead tr').append($('<th></th>').text(cols[key]).attr("scope","col"))
  }

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
      $('#table_container table').append($('<tbody></tbody>'))

      for (const key of Object.keys(data)) {
        const tr = $('<tr></tr>')
        for (const col in cols) {
          tr.append($('<td></td>').text(data[key][col]))
        }
        $('#table_container table tbody').append(tr)
      }
    })
    .fail((data, status) => {
      console.log(data)
    })
})
