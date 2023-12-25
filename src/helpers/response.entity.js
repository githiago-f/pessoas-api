export const responseEntity = function(BODY) {
    let status = 200;
    const headers = {
      "Content-Type": "application/json",
    };
    return {
        status(statusCode) { status = statusCode; return this; },
        putHeader(key, value) {
          headers[key] = value;
          return this;
        },
        build() {
            return {
                statusCode: status,
                body: JSON.stringify(BODY, null, 2),
                headers
            }
        }
    }
};
