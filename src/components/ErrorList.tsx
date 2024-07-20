import { FormErrors } from '@/types';

export default function ErrorList({ errorMessages }: FormErrors) {
  if (!errorMessages) return null;

  const mappedErrors = errorMessages.map(message => (
    <li key={message}>{message}</li>
  ));

  return <ul>{mappedErrors}</ul>;
}
