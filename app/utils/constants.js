exports.RESPONSE_STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    VALIDATE_ERROR: 422
}

exports.RESPONSE_MESSAGE = {
    SUCCESS: "Success",
    CREATED: "Successfully Created",
    UPDATED: "Successfully Updated",
    RETRIVED: "Successfully Retrived",
    DELETED: "Successfully Deleted",
    DATA_NOT_FOUND: "Data Not Found",
    NOT_EXIST: "NOT EXIST",
    SIGN_IN: "Successfully Sign In",
    SIGN_UP: "Successfully Sign Un",
    INVALID_PASSWORD: "Invalid Password",
    FORGET_PASSWORD: "Forget Password",
    ALREADY_EXIST: "Already Exist",
    VALIDATION_ERROR: "Validation Error",
    UN_AUTHORIZED: "Un Authorized",
    INVALID_TOKEN: "Invalid Token",
    INVALID_ADMIN: "Require Admin Role!",
    INVALID_SUPERVISOR: "Require Supervisor Role!",
    INVALID_ADMIN_SUPERVISOR: "Require Admin Or Supervisor Role!",
    INVALID_STAFF: "Require Staff Role!",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Not Found",
    BAD_REQUEST: "Bad Request",
    INTERNAL_ERROR: "Internal Server Error",
}

exports.DEFINE = {
    PAGE : 1,
    OFFSET : 0,
    MATCHING_QUERY_LIMIT : 10,
}

exports.ROLE = {
    ADMIN: "admin",
    SUPERVISOR: "supervisor",
    STAFF: "staff"
}