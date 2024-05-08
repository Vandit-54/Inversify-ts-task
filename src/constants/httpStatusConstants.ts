import { HttpStatusCode } from "../enum";

const HttpStatusConstants = {
    DUPLICATE_KEY_VALUE: {
        httpStatusCode: HttpStatusCode.CONFLICT,
        body: {
            code: 'duplicate_key_value',
            message: 'Value already existed',
        },
    },
    INTERNAL_SERVER_ERROR: {
        httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
            code: 'internal_server_error',
            message: 'Something went wrong, please try again later.',
        },
    },
    NOT_FOUND: {
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        body: {
            code: 'not_found',
            message: 'You lost somewhere. Please check URL again.',
        },
    },
    RESOURCE_NOT_FOUND: {
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        body: {
            code: 'resource_not_found',
            message: 'Requested resource not found.',
        },
    },
    RESOURCE_ALREADY_EXISTS: {
        httpStatusCode: HttpStatusCode.CONFLICT,
        body: {
            code: 'resource_already_exists',
            message: 'Requested resource already exists.',
        },
    },
    FORBIDDEN: {
        httpStatusCode: HttpStatusCode.FORBIDDEN,
        body: {
            code: 'forbidden',
            message: 'Permission denied.',
        },
    },
    UNAUTHORIZED: {
        httpStatusCode: HttpStatusCode.UNAUTHORIZED,
        body: {
            code: 'unauthorized',
            message: 'You are not authorized.',
        },
    },
    TOKEN_EXPIRED: {
        httpStatusCode: HttpStatusCode.UNAUTHORIZED,
        body: {
            code: 'token_expired',
            message: 'Provided authorization token has expired. Please renew the token with the provider entity.',
        },
    },
    CONFLICT: {
        httpStatusCode: HttpStatusCode.CONFLICT,
        body: {
            code: 'conflict',
            message: 'Duplicate resource',
        },
    },
    INVALID_DATA: {
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        body: {
            code: 'invalid_data',
            message: 'Provided arguments are invalid or do not exist',
        },
    },
    NOT_IMPLEMENTED: {
        httpStatusCode: HttpStatusCode.NOT_IMPLEMENTED,
        body: {
            code: 'not_implemented',
            message: 'Server does not support the functionality required to fulfill the request.',
        },
    },
    UNPROCESSABLE: {
        httpStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
        body: {
            code: 'unprocessable',
            message: 'The request is unable to be processed.',
        },
    },
    PERMISSION_DENIED: {
        httpStatusCode: HttpStatusCode.FORBIDDEN,
        body: {
            code: 'permission_denied',
            message: 'Permission denied.',
        },
    },
};

export default HttpStatusConstants;
