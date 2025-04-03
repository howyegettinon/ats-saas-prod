'use client'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getCsrfToken } from 'next-auth/react';

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    getCsrfToken().then(token => setCsrfToken(token || ''));
  }, []);

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form method="post" action="/api/auth/signin/email" onSubmit={handleSubmit(onSubmit)}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <input {...register('email')} type="email" />
      <button type="submit">Sign In</button>
    </form>
  );
}
