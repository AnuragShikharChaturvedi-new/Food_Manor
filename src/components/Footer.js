// Footer.js
const Footer = () => {
  const currYear = new Date().getFullYear();
  return (
      <footer className="bg-gray-900 text-gray-200 py-8 mt-auto"> {/* Added mt-auto */}
          <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-center">
                  {/* Logo Section */}
                  <div className="mb-6">
                      <h1 className="text-3xl font-bold text-orange-500">Food_Manor</h1>
                  </div>
                  
                  {/* Copyright Section */}
                  <div className="text-center">
                      <p className="text-sm text-gray-400">
                          Copyright &copy; {currYear} | All rights reserved
                      </p>
                      <p className="mt-2 text-sm">
                          Made with{" "}
                          <span className="text-red-500 animate-pulse">❤</span>{" "}
                          by{" "}
                          <span className="font-semibold text-orange-500">
                              Anurag
                          </span>
                      </p>
                  </div>
              </div>
          </div>
      </footer>
  );
};

export default Footer;
