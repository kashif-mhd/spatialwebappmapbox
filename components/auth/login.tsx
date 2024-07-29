// // src/components/Auth/Login.tsx
// import React, { useState } from 'react';
// import OnBoarding from '../OnBoarding';

// import { Input } from "../../components/ui/input"
// import { Label } from "../../components/ui/label"

// import { Button } from '../../components/ui/button'
// import { Checkbox } from "../../components/ui/checkbox"


// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signIn(email, password);
//       navigate('/dashboard');
//       alert('Logged in successfully');
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

//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input type="email"
//                 placeholder="Email"
//                 value={email}
//                 required
//                 onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div>
//               <Label htmlFor="email">Password</Label>
//               <Input type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required />    </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-start">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox id="terms" />
//                   <label
//                     htmlFor="terms"
//                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                   >
//                     Remember me
//                   </label>
//                 </div>
//               </div>
//               <Link to="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
//             </div>
//             <Button type="submit" variant="destructive" className='w-full bg-primary'>Sign in</Button>
//             <p>Don't have an account ? <Link to="/signup" className='font-semibold text-primary'>Sign Up</Link></p>
//           </form>
//         </div>
//       </div>
//     </OnBoarding>
//   );
// };

// export default Login;
