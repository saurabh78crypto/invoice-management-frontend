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
    <div className="bg-[#f9fcff] text-white h-screen w-48 flex flex-col">
      <div className="text-2xl text-[#3b647e] font-bold p-4">finifi</div>
      
      <nav className="flex-1">
        <ul>
          <li
            className={`p-4 ${currentPath === '/dashboard' ? 'bg-[#2e5a75] text-white' : 'hover:bg-[#2e5a75]'} ${currentPath === '/dashboard' ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <Link href="">
              <div className={`flex items-center space-x-2 ${currentPath === '/dashboard' ? 'text-white' : 'text-[#5d8094]'}`}>
                <ExploreIcon className={`${currentPath === '/dashboard' ? 'text-white' : 'text-[#5d8094]'}`} />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>

          <li
            className={`p-4 ${currentPath === '/' ? 'bg-[#2e5a75] text-white' : 'hover:bg-[#2e5a75]'}`}
          >
            <Link href="/">
              <div className={`flex items-center space-x-2 ${currentPath === '/' ? 'text-white' : 'text-[#5d8094]'}`}>
                <DescriptionIcon className={`${currentPath === '/' ? 'text-white' : 'text-[#5d8094]'}`} />
                <span>Invoices</span>
              </div>
            </Link>
          </li>

          <li
            className={`p-4 ${currentPath === '/vendors' ? 'bg-[#2e5a75] text-white' : 'hover:bg-[#2e5a75] hover:text-[#7592a4]'} ${currentPath === '/vendors' ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <Link href="">
              <div className={`flex items-center space-x-2 ${currentPath === '/vendors' ? 'text-white' : 'text-[#5d8094]'}`}>
                <BusinessIcon className={`${currentPath === '/vendors' ? 'text-white' : 'text-[#5d8094]'}`} />
                <span>Vendors</span>
              </div>
            </Link>
          </li>

          <li
            className={`p-4 ${currentPath === '/settings' ? 'bg-[#2e5a75] text-white' : 'hover:bg-[#2e5a75]'}`}
          >
            <Link href="">
              <div className={`flex items-center space-x-2 ${currentPath === '/settings' ? 'text-white' : 'text-[#5d8094]'}`}>
                <SettingsIcon className={`${currentPath === '/settings' ? 'text-white' : 'text-[#5d8094]'}`} />
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
