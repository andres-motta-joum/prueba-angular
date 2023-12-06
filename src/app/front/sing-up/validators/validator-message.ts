interface ErrorMessage {
    [key: string]: string;
}

const ErrorMessages: ErrorMessage = {
    required: 'This field is required',
    patternEmail: 'The email must be valid',
    minlength: 'This field must be 6 or more characters',
    maxlength: 'This field must be 25 or fewer characters'
};

export function validatorErrorMessage(validatorName: string): string {
    return ErrorMessages[validatorName] ?? '';
}