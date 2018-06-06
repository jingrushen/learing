$(function () {



  ///get
  $('.get-btn').on('click', function () {
    $.ajax({
      method: 'GET',
      url: '/list',
      contentType: 'application/json',
      success: function (res) {
        $('tbody').html('')
  
        res.products.forEach((item) => {
          $('tbody').append(`
            <tr>
              <td class='id'>
                ${item.id}
              </td>
              <td>
                <input type='text' value='${item.name}' class='name'/>
              </td>
              <td class='btn'>
                <button class='update-btn'>update</button>
                <button class='del-btn'>delete</button>
              </td>
            </tr>
          `)
        })
      }
    })
  })

  ///post
  $('.post-btn').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/list',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ name: $('.input-text').val()}),
      success: function (res) {
        $('.get-btn').click()
        $('.input-text').val('')
        console.log(res)
      }
    })
  })


  ///update
  $('table').on('click', '.update-btn', function (e) {
    let tr = $(this).closest('tr')
    let id = format(tr.find('.id').text())
    let name = tr.find('.name').val()
    
    $.ajax({
      url: '/list/' + id,
      method: 'PUT',
      data: JSON.stringify({ name: name }),
      contentType: 'application/json',
      success: function (res) {
        $('.get-btn').click()
        console.log(res)
      }
    })
    
  })

  ///delete
  $('table').on('click', '.del-btn', function (e) {
    let tr = $(this).closest('tr')
    let id = format(tr.find('.id').text())

    $.ajax({
      url: '/list/' + id,
      method: 'DELETE',
      contentType: 'application/json',
      success: function (res) {
        console.log(res)
        $('.get-btn').click()
      }
    })
  })

  function format(v) {
    return v.replace(/^(\s+)|(\s+)$/g, '')
  }
})