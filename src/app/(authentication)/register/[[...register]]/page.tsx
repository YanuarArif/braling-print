import { SignIn, SignOutButton, SignUp } from "@clerk/nextjs";

const DaftarPage = () => {
  return (
    <>
      <div className="h-full flex items-center justify-center bg-[#F5EFFF] bg-bg-street bg-bottom bg-no-repeat bg-[length:1000px_400px]">
        <div className="w-[350px] transition-all duration-500 ease-in-out md:w-[450px]">
          <SignUp fallbackRedirectUrl={"/dashboard"} signInUrl="/login" />
        </div>
      </div>
    </>
  );
};

export default DaftarPage;
