// "use client";

// import { useState } from "react";
// import { SignInFlow } from "@/app/types/auth";
// import DaftarCard from "@/app/components/daftar-card";
// import LoginCard from "@/app/components/login-card";

// const AuthScreen = () => {
//   const [login, setLogin] = useState<SignInFlow>("signIn");

//   return (
//     <div className="h-full flex items-center justify-center bg-[#F5EFFF] bg-bg-street bg-bottom bg-no-repeat bg-[length:1000px_400px]">
//       <div className="w-[350px] transition-all duration-500 ease-in-out md:w-[450px]">
//         {login === "signIn" ? (
//           <LoginCard setLogin={setLogin} />
//         ) : (
//           <DaftarCard setLogin={setLogin} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthScreen;
