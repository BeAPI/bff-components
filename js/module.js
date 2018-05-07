class Module {
  constructor() {
    this.var = 10
  }
  /**
   * [Method description]
   *
   */
  method() {
    console.log(`I am ${this.var}`)
  }
}

const myModule = new Module()
myModule.method()