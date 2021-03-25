class DatabaseError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DatabaseError'
  }
}

class HTTPError extends Error {
  constructor (message, status) {
    super(message)
    this.name = 'HTTPErro'
    this.status = status
  }
}

module.exports = {
  DatabaseError: DatabaseError
}
