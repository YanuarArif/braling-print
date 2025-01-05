import DaftarCard from "@/app/components/daftar-card";

const DaftarPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-black/20">
      <div className="md:h-auto md:w-[700px] transition-all duration-500 ease-in-out sm:w-[300px]">
        <DaftarCard />
      </div>
    </div>
  );
};

export default DaftarPage;
