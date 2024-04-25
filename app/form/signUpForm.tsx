'use client'
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input'; // Assuming this is the correct import path
import { Button } from '../ui/button';
import Link from 'next/link';
import { myContext } from '../../app/Main';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(4, 'Password must have more than 4 characters'),
  lastName: z.string().min(1, 'Last Name is required'),
  firstName: z.string().min(1, 'First Name is required'),
  confirmPassword: z.string().min(1, 'Please confirm password'),
  role: z.enum(['tenant', 'landlord']).optional(),
  authorizationKey: z.string().min(1, 'Authorization Key is required'),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

const ModalForm = () => {

  const {closeModal, isModalOpen} = useContext(myContext)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    closeModal();
  };

  return (
    <>
      

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-2 ">
                <div className="flex">
                  <div className="mr-2">
                    <div className="form-field">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <div className="form-control">
                        <Input id="firstName" placeholder="First Name" {...register('firstName')} />
                      </div>
                      {errors.firstName && <div className="form-message">{errors.firstName.message}</div>}
                    </div>
                  </div>
                  <div>
                    <div className="form-field">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <div className="form-control">
                        <Input id="lastName" placeholder="Last Name" {...register('lastName')} />
                      </div>
                      {errors.lastName && <div className="form-message">{errors.lastName.message}</div>}
                    </div>
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="form-control">
                    <Input id="email" placeholder="mail@example.com" {...register('email')} />
                  </div>
                  {errors.email && <div className="form-message">{errors.email.message}</div>}
                </div>
                <div className="form-field">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="form-control">
                    <Input id="password" type="password" placeholder="Enter password" {...register('password')} />
                  </div>
                  {errors.password && <div className="form-message">{errors.password.message}</div>}
                </div>
                <div className="form-field">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="form-control">
                    <Input id="confirmPassword" type="password" placeholder="Confirm password" {...register('confirmPassword')} />
                  </div>
                  {errors.confirmPassword && <div className="form-message">{errors.confirmPassword.message}</div>}
                </div>
                <div className="form-field">
                  <label htmlFor="authorizationKey" className="form-label">
                    Authorization Key
                  </label>
                  <div className="form-control">
                    <Input id="authorizationKey" name="authorizationKey" {...register('authorizationKey')} />
                  </div>
                  {errors.authorizationKey && <div className="form-message">{errors.authorizationKey.message}</div>}
                </div>
              </div>

              <div className="flex items-center mb-3 mt-6 space-x-8">
                <div>
                  <input type="radio" id="tenant" value="tenant" {...register('role')} />
                  <label className="text-white space-x-4" htmlFor="tenant">
                    Tenant
                  </label>
                </div>
                <div>
                  <input type="radio" id="landlord" value="landlord" {...register('role')} />
                  <label className="text-white" htmlFor="landlord">
                    Landlord
                  </label>
                </div>
              </div>

              <Button className="w-full mt-6 bg-pink-600" type="submit">
                Sign up
              </Button>
            </form>

            <p className="text-center text-sm text-white mt-2">
              If you already have an account, please&nbsp;
              <Link className="text-pink-600 hover:underline" href="/signIn">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForm;