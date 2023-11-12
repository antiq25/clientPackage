class SafeError extends Error {
  public forClient: boolean
  constructor(message: any, forClient: boolean = false) {
    super(message)
    this.name = 'SafeError'
    this.forClient = forClient
  }
}

export default SafeError
