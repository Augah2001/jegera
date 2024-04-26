'use client'
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@chakra-ui/react';
import { FormModalContext } from '../contexts/FormModalContext';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(4, 'Password must have more than 4 characters')
});

const ModalForm = () => {
 
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

 

  
  const router = useRouter()
  const {isOpen, onClose} = useContext(FormModalContext)
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    onClose();
  };



  return (
    <>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-2">
                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="form-control">
                    {/* <Input id="email" placeholder="mail@example.com" {...register('email')} /> */}
                  </div>
                  {errors.email && <div className="form-message">{errors.email.message}</div>}
                </div>

                <div className="form-field">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="form-control">
                    {/* <Input id="password" type="password" placeholder="Enter password" {...register('password')} /> */}
                  </div>
                  {errors.password && <div className="form-message">{errors.password.message}</div>}
                </div>
              </div>

              {/* <Button className="w-full mt-6 bg-pink-600" type="submit">
                Sign in
              </Button> */}
            </form>

            <p className="text-center text-sm text-white mt-2">
              If you don&apos;t have an account, please&nbsp;
              <Link className="text-pink-600 hover:underline" href="/signUp">
                Sign up
              </Link>
            </p>
            <button className="modal-close" onClick={()=> {
              onClose()
              router.push('./')
            }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForm;