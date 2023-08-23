class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};

class Unauthorised extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};

module.exports = {BadRequest, Unauthorised, Forbidden}