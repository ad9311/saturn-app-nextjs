'use client';

import { FormErrors } from '@/types';

export default function ErrorList({ errors }: FormErrors) {
  if (!errors) {
    return null;
  }

  const mappedErrors = errors.map(error => <li key={`${error.message}`}>{error.message}</li>);

  return <ul>{mappedErrors}</ul>;
}
