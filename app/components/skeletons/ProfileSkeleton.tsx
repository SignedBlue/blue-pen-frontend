
const ProfileSkeleton = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between rounded-md  mb-10 px-5 animate-pulse">
        <div className="flex items-center gap-x-4">
          <span className="h-[40px] min-w-[200px] flex items-center justify-start rounded-md text-2xl lg:text-4xl font-bold text-neutral-50 tracking-widest blur-[4px]">
            Editar perfil
          </span>
        </div>
        <div className="flex items-center gap-x-5"></div>
      </nav>

      <section className="flex flex-col gap-y-5 items-start w-[60%]">
        <div className="w-full flex items-center justify-between gap-x-7">
          <div className="w-full flex flex-col items-start gap-y-1">
            <span>...</span>
            <div className="_input bg-white animate-pulse" />
          </div>
          <div className="w-[80%] flex flex-col items-start gap-y-1">
            <span>...</span>
            <div className="_input bg-white animate-pulse" />
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-y-1">
          <span>...</span>
          <div className="_input bg-white animate-pulse" />
        </div>

        <div className="w-full flex flex-col items-start gap-y-1">
          <span>...</span>
          <div className="_input bg-white animate-pulse" />
        </div>

        <div className="w-full flex items-center justify-between gap-x-7">
          <div className="w-[80%] flex flex-col items-start gap-y-1">
            <span>...</span>
            <div className="_input bg-white animate-pulse" />
          </div>
          <div className="w-full flex flex-col items-start gap-y-1">
            <span>...</span>
            <div className="_input bg-white animate-pulse" />
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-x-7">
          <div className="w-[80%] flex flex-col items-start gap-y-1">
            <span>...</span>
            <div className="_input bg-white animate-pulse" />
          </div>
          <div className="w-full flex flex-col items-start gap-y-1">
            <span>...</span>
            <div className="_input bg-white animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileSkeleton;