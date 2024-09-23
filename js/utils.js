const links = [
  {
    link: '/user/home.html',
    display: 'home'
  },
  {
    link: '/student/student_details.html',
    display: 'student details'
  }
]

function navbar () {
  $(document.body).prepend(
    $('<div> </div>')
      .attr('id', 'navbar')
      .addClass(
        'navbar navbar-expand  d-flex justify-content-between container-fluid  align-items-center'
      )
      .css({
        marginBottom: '20px',
        'text-transform': 'capitalize',
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: '5px 10px'
      })
  )
  $('#navbar').append(
    $('<div></div>').append($('<ul></ul>').addClass('navbar-nav'))
  )
  for (const link of links) {
    $('#navbar div:first-child ul').append(
      $('<li> </li>').append(
        $('<a> </a>')
          .addClass('nav-link')

          .css({
            padding: '5px 10px',
            color: 'rgba(0,0,0,0.5)',
            transition: '.3s'
          })
          .hover(
            function (e) {
              $(this).next().css({
                width: '100%'
              })

              $(this).css({
                color: 'black'
              })
            },
            function (e) {
              $(this).next().css({
                width: '0%'
              })
              $(this).css({
                color: 'rgba(0,0,0,0.5)'
              })
            }
          )
          .text(link.display)
          .attr('href', link.link),
        $('<div></div>').css({
          width: 0,
          height: '1px',
          backgroundColor: 'black',
          transition: 'width .3s'
        })
      )
    )
  }
  $('#navbar').append(
    // $('<div></div>')
    //   .append(
    $('<button></button>')
      .addClass('btn btn-outline-danger')
      .text('logout')
      .click(function () {
        localStorage.removeItem('token')
        window.open('/', '_self')
      })
    //   )
  )
}

function checkSecure (success = d => {}) {
  $.ajax({
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    url: `${url}/secure_endpoint`,
    dataType: `json`
  })
    .done(function (data, status) {
      console.log(data)
      console.log(status)
      if (status != 'success') {
        console.log('Something went wrong')
        return
      }
      success(data)
    })
    .fail(function (data) {
      window.open('/', '_self')
    })
}

function formGenerator (config) {
  for (let i = 0; i < config.fields.length; i++) {
    $(config.parent).append(
      $('<div> </div>').addClass(`student-form-row-${i} row`).css({
        marginBottom: '20px'
      })
    )
    for (let j = 0; j < config.fields[i].length; j++) {
      $(`.student-form-row-${i}`).append(
        $('<div> </div>').addClass(`student-form-row-${i}-col-${j} col`)
      )
      const field = config.fields[i][j]

      if (field.type == 'div') {
        console.log('Image Helper Element', field.element())
        $(`.student-form-row-${i}-col-${j}`).append(
          $(`<div></div>`).attr('id', field.name).append(field.element())
        )
        continue
      }

      if (field.type === 'radio') {
        $(`.student-form-row-${i}-col-${j}`).append(
          $('<div></div>').append(
            $('<label></label>').addClass('').text(field.label)
          )
        )
        for (const value of field.values) {
          $(`.student-form-row-${i}-col-${j}`).append(
            $('<div></div>')
              .addClass('form-check ')
              .append(
                $('<label></label>')
                  .addClass('form-check-label text-capitalize')
                  .text(value.label),
                $('<input>')
                  .attr('type', field.type)
                  .attr('id', field.name)
                  .attr('name', field.name)
                  .attr('value', value.value)
                  .addClass('form-check-input')
              )
          )
        }

        continue
      }

      if (field.type == 'select') {
        $(`.student-form-row-${i}-col-${j}`).append(
          $('<div></div>').append(
            $('<label></label>').addClass('mb-2').text(field.label)
          )
        )

        $(`.student-form-row-${i}-col-${j}`).append(
          $('<select> </select>')
            .addClass('form-select')
            .attr('name', field.name)
            .attr('id', field.name)
        )

        for (const key in field.options) {
          $(`.student-form-row-${i}-col-${j} select`).append(
            $('<option></option>').attr('value', key).text(field.options[key])
          )
        }
        continue
      }

      $(`.student-form-row-${i}-col-${j}`).append(
        $('<div> </div>')
          .addClass('form-group')
          .append(
            $('<label></label>').attr('for', field.id).text(field.label),
            $('<input>')
              .attr('type', field.type)
              .attr('id', field.name)
              .attr('name', field.name)
              .addClass('form-control')
              .change(function (e) {
                if (field.onchange) field.onchange(e)
              })
          )
      )
    }
  }
  $(config.parent).append(
    $('<div></div>')
      .css({
        'text-align': 'right',
        marginTop: '40px'
      })
      .append(
        $('<button></button>')
          .addClass(config.button?.class || 'btn btn-outline-primary')
          .text(config.button?.text || 'submit')
      )
  )
}
const addImageHelper = name => {
  const data = $(`input#${name || 'image'}`).attr('data')
  console.log('Image Helper input Element data', data)
  if (data) {
    $('div#imageHelper').empty()
    $('div#imageHelper').append(
      $('<img></img>').attr('src', data).css({
        width: '200px',
        height: '200px'
      })
    )
  }
  return ''
}

const removeImageHelper = () => {
  $('div#imageHelper').empty()
}
function encodeImageFileAsURL (e) {
  if (e instanceof jQuery.Event) {
    e = e.target
  }
  let file = e.files[0]
  let reader = new FileReader()

  reader.onloadend = function () {
    $(e).attr('data', reader.result)
    console.log('RESULT', $(e).attr('data'))
    console.log('RESULT length', $(e).attr('data').length)
    console.log('e.parent', $(e).parent())
    removeImageHelper()
    $(e).parent().find('div').empty()
    $(e)
      .parent()
      .css({})
      .append(
        $('<div></div>').append(
          $('<img></img>').attr('src', reader.result).css({
            width: '200px',
            height: '200px',
            marginTop: '10px'
          })
        )
      )
  }
  reader.readAsDataURL(file)
}

function dateYMD (date) {
  console.log(date)
  const lt10 = num => {
    if (num < 10) return `0${num}`
    return num
  }
  if (!(date instanceof Date)) throw new Error('Not Valid Date')
  const finalDate = `${date.getFullYear()}-${lt10(date.getMonth() + 1)}-${lt10(
    date.getDate()
  )}`
  return finalDate
}

async function popup (title, message) {
  return new Promise(resolve => {
    const modal = $('<div></div>')
      .css({
        backgroundColor : "rgba(0,0,0,0.6)"
      })
      .addClass('modal d-block')
      .attr('id', 'popup')
      .attr('tabindex', -1)
      .attr('role', 'dialog')

    const header = $('<div></div>')
      .addClass('modal-header')
      .append(
        $('<h5></h5>')
          .addClass('modal-title')
          .text(title || 'Error'),
        $('<button></button>')
          .attr("type","button")
          .css({
            border : 0,
            backgroundColor : "inherit",
            fontSize:"1.3rem"
          })
          .addClass('close')
          .click(() => {
            modal.remove()
            resolve(true)
          })
          .attr('data-dismiss', 'modal')
          .attr('aria-label', 'close')
          .append($('<span></span>').html('&times;').attr('aria-hidden', true))
      )

    const body = $('<div></div>')
      .addClass('modal-body')
      .append($('<p></p>').text(message))

    const footer = $('<div></div>')
      .addClass('modal-footer')
      .append(
        $('<button></button>')
          .addClass('btn btn-primary')
          .text('Ok')
          .click(() => {
            modal.remove()
            resolve(true)
          })
      )

    modal.append(
      $('<div></div>')
        .addClass('modal-dialog')
        .attr('role', 'document')
        .append(
          $('<div></div>')
            .addClass('modal-content')
            .append(header, body, footer)
        )
    )
    // $(document.body).append(
    //   $("<div></div>").css({
    //       display : "fixed",
    //       width : "100%",
    //       height : "100vh",
    //       backgroundColor : "rgba(0,0,0,0.5)"
    //   })
    // )

    $(document.body).append(modal)
  })
}
