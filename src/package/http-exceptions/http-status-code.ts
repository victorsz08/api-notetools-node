

type StatusCode = 200 | 204 | 400 | 401 | 404 | 409 | 500;

export const StatusCode = {
    OK: 200 as StatusCode,
    NOT_CONTENT: 204 as StatusCode,
    BAD_REQUEST: 400 as StatusCode,
    UNAUTHORIZED: 401 as StatusCode,
    NOT_FOUND: 404 as StatusCode,
    CONFLICT: 409 as StatusCode,
    INTERNAL_SERVER_ERROR: 500 as StatusCode,
} as const;