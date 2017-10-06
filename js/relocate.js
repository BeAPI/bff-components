// Initialize the media query
var bp = 1024
var mediaQuery = window.matchMedia(`(min-width: ${bp}px)`)

// Add a listen event
mediaQuery.addListener(initRelocate)
document.addEventListener('DOMContentLoaded', initRelocate(mediaQuery));

// Function to do something with the media query
function initRelocate (mediaQuery) {
  if (mediaQuery.matches) {
    reloacteFoo('dekstop')
  } else {
    reloacteFoo('mobile')
  }
}

function reloacteFoo (match) {
  if (match === 'desktop') {
    // Do something for desktop breakpoint
  } else if (match === 'mobile') {
    // Do something for mobile breakpoint
  }
}