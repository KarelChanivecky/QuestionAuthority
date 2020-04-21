const errorMessages = {
    207: 'invalid column name',
    547: 'FK constraint violation',
    2627: 'Unique key constraint violation'
};

class Err {
    constructor() {
        this.code = null;
        this.message = null;
    }
}

export default function handleError(exceptions) {
    let error = new Err();
    if (exceptions.precedingErrors.length === 0) {
        error.code = exceptions.number;
        error.message = errorMessages[error.code];
    }else{
        for (let err of exceptions.precedingErrors){
            error.code = err.number;
            if (errorMessages[err.number]){
                error.message = errorMessages[error.code];
                break;
            }
        }
    }
    if (!error.message) {
        error.message = "database error";
    }
    return error;
}