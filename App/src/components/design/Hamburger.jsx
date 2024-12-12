import car from '../../assets/person.png'

export const HamburgerMenu = () => {
  return (
    <div className="absolute inset-0 bg-white pointer-events-none lg:hidden">
      <div className="relative inset-0 opacity-[.33]">
      <img
          className="w-full h-full object-cover"
          src={car}
          width={6}
          height={3}
          alt="Background"
        />
      </div>
    </div>
  );
};
