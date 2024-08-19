// import React, { useState } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import OnBoarding from '../OnBoarding';

// import { Input } from "../../components/ui/input"
// import { Label } from "../../components/ui/label"
// import { Button } from '../../components/ui/button'

// const ForgotPassword: React.FC = () => {
//   const { resetPassword } = useAuth();
  
//   const [email, setEmail] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await resetPassword(email);
//       alert('Password reset email sent');
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//       alert(errorMessage);
//     }
//   };

//   return (
    
//     <OnBoarding>
//       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//           <div className="text-center">
//             <img src="./images/logo.svg" alt="" className='h-12 mb-8 inline-block' />
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//               Sign in to your account
//             </h1>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
//         <div>
//               <Label htmlFor="email">Email</Label>
//               <Input  type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required />
//             </div>
      
//             <Button type="submit" variant="destructive" className='w-full bg-primary'>Reset Password</Button>
//     </form>
//     </div>
//     </div>
//     </OnBoarding>
//   );
// };

// export default ForgotPassword;
