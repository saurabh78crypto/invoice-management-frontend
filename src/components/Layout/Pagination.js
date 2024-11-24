import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="bg-white flex items-center justify-center ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400' : 'text-[#4C6F94]'}`}
      >
        <NavigateBeforeIcon fontSize="large" />
      </button>
      <span className="mx-4 text-lg font-medium text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-[#4C6F94]'}`}
      >
        <NavigateNextIcon fontSize="large" />
      </button>
    </div>
  );
};

export default Pagination;
