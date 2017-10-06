/*
* Snippet for loadmore.
* README : https://bitbucket.org/snippets/beapi/9nn85/loadmore-for-_underscore-template
* @author Romain Lefort
*/

/* global bea_loadmore_vars */
/* eslint no-undef: "error" */

const $ = require('jquery')
const _ = require('loadash')

let loadmoreData = '[data-loadmore="trigger"]'
let $loadmoreBtn = jQuery(loadmoreData)
let containerData = '[data-loadmore="container"]'
let $container = jQuery(containerData)

if ($loadmoreBtn.length > 0) {
  let paged = 0
  $loadmoreBtn.on('click', e => {
    e.preventDefault()

    let $this = jQuery(this)
    let tpl = $this.data('tpl')
    let ppp = $this.data('ppp') ? $this.data('ppp') : null
    let next = $this.data('next') ? $this.data('next') : null
    let start = ppp * paged
    let end = start + ppp

    $loadmoreBtn.addClass('button--loading')

    if ($this.data('url')) {
      var prefixUrl = $this.data('url')
      // Update data paged
      paged = parseInt($this.attr('data-paged')) + 1
      getDataFromUrl($this, prefixUrl, paged, ppp, next, tpl)
    } else {
      let data = fetchDataToShow(start, end)
      loadmoreLocalizeScript(data, ppp, tpl)
      paged++
    }
  })

  // Reload the page on history event
  $(window).on('popstate', e => {
    e.preventDefault()
    window.location.reload()
  })
}

/**
* @param  {string} prefix
* @param  {int} paged
* @param  {int} ppp
* @param  {string} next
* @param  {string} tpl
*/
function getDataFromUrl (that, prefix, paged, ppp, next, tpl) {
  let firstChar = checkUrlArgs(prefix)
  let url = ppp ? `${prefix}${firstChar}page=${paged}&per_page=${ppp}` : `${prefix}/${paged}`
  $.getJSON(url, function () {
    $loadmoreBtn.removeClass('button--loading')
  }).done(data => {
    if (data.length > 0) {
      that.attr('data-paged', paged)
      buildHtmlTemplate(data, tpl)
      if (next) {
        updatePageState(next, paged)
      }
    }
    // Hide loadmore button if there is no more data to show
    if (data.length < ppp || data.length === 0) {
      $loadmoreBtn.hide()
    }
  })
}

/**
* @param  {string} next
* @param  {int}   paged
* @return {bool}
*/
function updatePageState (next, paged) {
  if (!next) {
    return false
  }
  let args = window.location.search.substring(1)
  let pageTitle = `${jQuery('title').text()} | Page ${paged}`
  let newUrl = next + paged + '?' + args
  document.title = pageTitle
  window.history.pushState({ 'pageTitle': pageTitle }, '', newUrl)

  return true
}

/**
* @param  {int} start
* @param  {int} end
* @return {array} data
*/
function fetchDataToShow (start, end) {
  let data = []
  // Iterate through data to show
  for (let i = start; i < end; i++) {
    if (bea_loadmore_vars.load_more_values[i]) {
      data.push(bea_loadmore_vars.load_more_values[i])
    } else {
      continue
    }
  }
  return data
}

/**
* @param  {array} data
* @param  {int} ppp
* @param  {string} tpl
*/
function loadmoreLocalizeScript (data, ppp, tpl) {
  // Fake loading animation
  setTimeout(() => {
    buildHtmlTemplate(data, tpl)
    $loadmoreBtn.removeClass('button--loading')
  }, 500)

  // Hide loadmore button if there is no more data to show
  if (data.length < ppp) {
    $loadmoreBtn.hide()
  }
}

/**
* @param  {array}
* @param  {string}
*/
function buildHtmlTemplate (data, tpl) {
  _.templateSettings.variable = 'data'
  // Define template
  let contextFromTemplate = jQuery(tpl).html()
  // processed Template
  let processedTemplate = _.template(contextFromTemplate)

  $container.append(processedTemplate(data))
}

/**
 * @param {string} url
 * @return {string} char
 */
function checkUrlArgs (url) {
  let arr = url.split('?')
  let char = '?'
  if (arr.length > 1 && arr[1] !== '') {
    char = '&'
  }
  return char
}