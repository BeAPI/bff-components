const $ = require('jquery')

const k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
let n = 0

$(document).keydown(e => {
  if (e.keyCode === k[n++]) {
    if (n === k.length) {
      foo()
      n = 0
      return false
    }
  }
  else {
    n = 0
  }
});

function foo () {
  console.log('Konami code !')
}