const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*'
}

export default {
    _200 (message) {
        return {
            headers,
            statusCode: 200,
            body: message
        }
    },
    _400 (message) {
        return {
            headers,
            statusCode: 400,
            body: message
        }
    }
}