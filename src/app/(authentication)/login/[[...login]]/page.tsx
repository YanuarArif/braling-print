import { SignIn, SignOutButton } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <>
      <div className="h-full flex items-center justify-center bg-[#F5EFFF] bg-bg-street bg-bottom bg-no-repeat bg-[length:1000px_400px]">
        <div className="w-[350px] transition-all duration-500 ease-in-out md:w-[450px]">
          {/* <LoginCard /> */}
          <SignIn fallbackRedirectUrl={"/dashboard"} signUpUrl="/register" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
