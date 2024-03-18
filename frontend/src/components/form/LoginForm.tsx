'use client';

import { Button, InputText } from '../formElement';
import * as yup from 'yup';
import { useFormik } from 'formik';

import Link from 'next/link';
import { signIn } from 'next-auth/react';

export function LoginForm() {
  let schema = yup.object({
    email: yup.string().email().required('Campo obligatorio'),
    password: yup.string().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (values) => {
      signIn('credentials', { ...values });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 w-full'>
      <InputText
        name={'email'}
        label={'Email'}
        placeholder='ejemplo@gmail.com'
        value={formik.values.email}
        change={formik.handleChange}
        blur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helpertext={formik.touched.email && formik.errors.email}
      />
      <InputText
        name={'password'}
        label={'Contrasseña'}
        type='password'
        placeholder='********'
        value={formik.values.password}
        change={formik.handleChange}
        blur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helpertext={formik.touched.password && formik.errors.password}
      />

      <div className='w-full text-center'>
        <Button text='Iniciar sesión' type='submit' />
      </div>
    </form>
  );
}
