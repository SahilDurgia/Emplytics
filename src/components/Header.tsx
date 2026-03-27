const Header = () => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-800">
          Emplytics
        </h1>
        <p className="text-sm text-gray-500">
          Employee insights & performance overview
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600 font-medium">Sahil</div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white flex items-center justify-center font-semibold shadow">
          S
        </div>
      </div>
    </div>
  );
};

export default Header;
