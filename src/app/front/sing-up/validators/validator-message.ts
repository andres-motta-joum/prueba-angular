interface ErrorMessage {
    [key: string]: string;
}

const ErrorMessages: ErrorMessage = {
    required: 'This field is required',
    patternEmail: 'The email must be valid',
    minlength: 'This field must be 8 or more characters',
    maxlength: 'This field must be 30 or fewer characters'
};

export function validatorErrorMessage(validatorName: string): string {
    return ErrorMessages[validatorName] ?? '';
}