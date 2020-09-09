import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string; // Assim eu digo q tenho uma string na chave outra no valor, assim fica dinamico
}
// tipo a função com erro yup para me dar acesso aos campos q quero com mensagens.. (err: ValidationError)
// Retorno Errors
export default function getValidationErrors(err: ValidationError): Errors {
  const ValidationErrors: Errors = {};
  err.inner.forEach(error => {
    ValidationErrors[error.path] = error.message;
  });
  return ValidationErrors;
}
