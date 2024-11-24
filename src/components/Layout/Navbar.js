import NotificationsIcon from '@mui/icons-material/Notifications';  

const Navbar = () => {
  return (
    <div className="bg-white flex justify-between items-center shadow-md p-4 pb-2 border-b border-gray-300"> 
      <h1 className="text-xl font-bold text-[#1E2A38]">Manage Invoices</h1> 
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded-full">
          <NotificationsIcon 
            className="text-[#1E2A38] text-lg" 
            style={{ fill: 'none', stroke: '#4B5563', strokeWidth: 2 }}  
          />
        </div>

        <div className="flex items-center space-x-2">
          <img
            src="/assets/img/profile.png"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-[#1E2A38] font-semibold">Rohit Sharma</span>
            <span className="text-[#6B7280] text-xs">rohit.sharma@growquest.in</span> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
