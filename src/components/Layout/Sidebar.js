import Link from 'next/link';
import { useRouter } from 'next/router';
import ExploreIcon from '@mui/icons-material/Explore';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  const router = useRouter(); 
  const currentPath = router.pathname;

  return (
    <div className="bg-[#1E2A38] text-white h-screen w-48 flex flex-col">
      <div className="text-2xl font-bold p-4">Finifi</div>
      
      <nav className="flex-1">
        <ul>

          <li
            className={`p-4 ${currentPath === '/dashboard' ? 'bg-[#2A3949]' : 'hover:bg-[#2A3949]'} ${currentPath === '/dashboard' ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <Link href="">
              <div className="flex items-center space-x-2">
                <ExploreIcon className="text-white" />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>

          <li
            className={`p-4 ${currentPath === '/'  ? 'bg-[#2A3949]' : 'hover:bg-[#2A3949]'}`}
          >
            <Link href="/">
              <div className="flex items-center space-x-2">
                <DescriptionIcon className="text-white" />
                <span>Invoices</span>
              </div>
            </Link>
          </li>

          
          <li
            className={`p-4 ${currentPath === '/vendors' ? 'bg-[#2A3949]' : 'hover:bg-[#2A3949]'} ${currentPath === '/vendors' ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <Link href="">
              <div className="flex items-center space-x-2">
                <BusinessIcon className="text-white" />
                <span>Vendors</span>
              </div>
            </Link>
          </li>

          <li
            className={`p-4 ${currentPath === '/settings' ? 'bg-[#2A3949]' : 'hover:bg-[#2A3949]'} ${currentPath === '/settings' ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <Link href="">
              <div className="flex items-center space-x-2">
                <SettingsIcon className="text-white" />
                <span>Settings</span>
              </div>    
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
