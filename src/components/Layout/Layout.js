import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-48 bg-[#1E2A38] text-white" /> {/* Shrinked width */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-0 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
