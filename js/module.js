/**
 * [MODULE description]
 */
let MODULE = () => {
  let self = {}
  let privateVar = 10

  self.publicAttr = "bonjour"

  /**
   * [privateMethod description]
   * @return {[type]} [description]
   */
  let privateMethod = () => {
    console.log('I am private !')
  }

  /**
   * [publicMethod description]
   * @return {[type]} [description]
   */
  self.publicMethod = () => {
    console.log('I am accessible !')
  }

  return self
}

MODULE().publicMethod() // return 'I am accessible !'
MODULE().privateMethod() // return an error

console.log(MODULE().publicAttr) // return 'bonjour'