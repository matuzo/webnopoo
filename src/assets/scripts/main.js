// Focus Visible Polyfill
import 'focus-visible'

if (document.querySelector('.send')) {
    var btn = document.querySelector('button')
    var send = document.querySelector('.send')
    var msg = ''

    let params = new URL(document.location).searchParams
    let fromParam = params.get('from')
    let toParam = params.get('to')
    let msgParam = params.get('message')

    if (fromParam && toParam && msgParam) {
        msg = `<p>Dear ${fromParam},<br><br>${msgParam.replace(
            '\r\n',
            '\\r\\n'
        )}</p><p>Yours truly,<br>${toParam}</p>`

        send.classList.add('sent')
        send.innerHTML = msg
    }

    btn.addEventListener('click', function () {
        var from = document.getElementById('from').value
        var message = document.getElementById('message').value
        var to = document.getElementById('to').value

        msg = `<p>Dear ${from},<br><br>${message}</p><p>Yours truly,<br>${to}</p>`

        send.classList.add('sent')
        send.innerHTML = msg

        let params = new URL(location).searchParams
        params.set('from', from)
        params.set('to', to)
        params.set('message', message)

        var state = {}
        var title = ''
        var url = `${location.pathname}?${params}`

        history.pushState(state, title, url)
        send.focus()
        document.querySelector('.js-copy-wrappper').style.display = 'block'
        document.getElementById('copy').value = location.href
    })

    function copyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
    
      //
      // *** This styling is an extra step which is likely not required. ***
      //
      // Why is it here? To ensure:
      // 1. the element is able to have focus and selection.
      // 2. if element was to flash render it has minimal visual impact.
      // 3. less flakyness with selection and copying which **might** occur if
      //    the textarea element is not visible.
      //
      // The likelihood is the element won't even render, not even a
      // flash, so some of these are just precautions. However in
      // Internet Explorer the element is visible whilst the popup
      // box asking the user for permission for the web page to
      // copy to the clipboard.
      //
    
      // Place in top-left corner of screen regardless of scroll position.
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;
    
      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em';
      textArea.style.height = '2em';
    
      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0;
    
      // Clean up any borders.
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
    
      // Avoid flash of white box if rendered for any reason.
      textArea.style.background = 'transparent';
    
    
      textArea.value = text;
    
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
    
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        alert('Link copied.')
      } catch (err) {
        console.log('Oops, unable to copy');
      }
    
      document.body.removeChild(textArea);
    }
    
    
    var copyBobBtn = document.querySelector('.js-copy')
    
    copyBobBtn.addEventListener('click', function(event) {
      copyTextToClipboard(document.getElementById('copy').value);
    });
  
}
