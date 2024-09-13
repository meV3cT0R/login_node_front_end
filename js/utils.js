const links = [
  {
    link: '/user/home.html',
    display: 'home'
  }
]

function navbar () {
  $(document.body).prepend(
    $('<div> </div>')
      .attr('id', 'navbar')
      .addClass(
        'navbar navbar-expand bg-light d-flex justify-content-between container  align-items-center'
      )
      .css({
        'marginBottom': '20px',
        "text-transform" : "capitalize"
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
            padding: '5px 10px'
          })
          .text(link.display)
          .attr('href', link.link)
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
  for (const field of config.fields) {
    if(field.type==="radio") {
        $(config.parent).append(
          $("<div></div>").append(
            $("<label></label>").addClass("").text(field.label)
          )
        )
        for(const value of field.values) {
          $(config.parent).append(
              $("<div></div>").addClass("form-check ")
                .append(
                    $("<label></label>").addClass("form-check-label text-capitalize").text(value.label),
                    $('<input>')
                    .attr('type', field.type)
                    .attr('id', field.name)
                    .attr('name', field.name)
                    .attr('value',value.value).addClass("form-check-input")
                )
          )
        }

          continue;
    }
    $(config.parent).append(
      $('<div> </div>')
        .css({
          marginBottom: '20px'
        })
        .addClass(['form-group'])
        .append(
          $('<label></label>').attr('for', field.id).text(field.label),
          $('<input>')
            .attr('type', field.type)
            .attr('id', field.name)
            .attr('name', field.name)
            .addClass('form-control')
        )
    )
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
