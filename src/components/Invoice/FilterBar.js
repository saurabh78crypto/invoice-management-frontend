const FilterBar = ({ selectedStatus, onFilter }) => {
  const statuses = [
    "All",
    "Open",
    "Awaiting Approval",
    "Approved",
    "Processing",
    "Paid",
    "Rejected",
    "Vendor Not Found",
    "Duplicate",
    "Void",
  ];

  const handleFilterClick = (status) => {
    onFilter(status); 
  };

  return (
    <div className="flex p-4 pb-2 bg-white shadow-md border-b border-gray-300 mb-0">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => handleFilterClick(status)}
          className={`relative px-4 pb-1 text-sm mr-4 ${
            selectedStatus === status 
              ? 'text-[#4C6F94] font-bold border-b-2 border-[#F9C200]' 
              : 'text-gray-700 hover:text-[#4C6F94]' 
          }`}
        >
          {status}
          {selectedStatus === status && (
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F9C200]"
              style={{ transform: 'translateY(2px)' }} 
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
