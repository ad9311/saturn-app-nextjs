'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn ${pending ? 'btn-neutral' : 'btn-primary'}`}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
