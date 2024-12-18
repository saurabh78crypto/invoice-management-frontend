import { useState, useEffect } from 'react';

const InvoiceTable = ({ invoices, selectedInvoice, onEditSelect, onDeselect }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selectedInvoice) {
      setSelected([selectedInvoice._id]);
      setSelectAll(false);
    } else {
      setSelected([]);  
    }
  }, [selectedInvoice]);

  useEffect(() => {
    setSelectAll(selected.length === invoices.length && invoices.length > 0);
  }, [selected, invoices]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
      onDeselect();
    } else {
      const allIds = invoices.map((invoice) => invoice._id);
      setSelected(allIds);
      onDeselect();
    }
    setSelectAll(!selectAll);
  };

  const toggleSelect = (invoice) => {
    setSelected((prevSelected) => {
      const isSelected = prevSelected.includes(invoice._id);

      if (isSelected) {
        const newSelected = prevSelected.filter((id) => id !== invoice._id);
        if (newSelected.length === 0){
          onDeselect();
        }
        return newSelected;
      } else {
          if(!selectedInvoice || selectedInvoice._id !== invoice._id){
            onEditSelect(invoice);
          }
          return [...prevSelected, invoice._id];
      }
    });
  };

  const formatDate = (date) => {
    if (!date) return '-';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatAmount = (amount) => {
    if (!amount) return '-';
    return Number(amount).toLocaleString();
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Awaiting Approval':
        return 'border border-[#998dfe] bg-[#f5f4fe] text-[#998dfe] rounded-md px-4 py-1 text-xs font-medium'; // Blue border, light blue background, blue text
      case 'Open':
        return 'border border-[#9cb9d8] bg-[#eef8ff] text-[#9cb9d8] rounded-md px-4 py-1 text-xs font-medium'; // Green border, light green background, green text
      case 'Paid':
        return 'border border-[#8ccc8c] bg-[#f5faf4] text-[#8ccc8c] rounded-md px-4 py-1 text-xs font-medium'; // Grey border, light grey background, dark grey text
      default:
        return 'border border-[#EB5757] bg-[#FFE9E9] text-[#EB5757] rounded-md px-4 py-1 text-xs font-medium'; // Fallback styling for unknown statuses
    }
  };

  return (
    <div className="p-4 bg-white shadow">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[#F1F1F1] text-[#333333]">
            <tr>
              <th className="border-b p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="cursor-pointer"
                />
              </th>
              <th className="border-b p-3 text-left">Vendor Name</th>
              <th className="border-b p-3 text-left">Invoice No</th>
              <th className="border-b p-3 text-left">Status</th>
              <th className="border-b p-3 text-left">Net Amount</th>
              <th className="border-b p-3 text-left">Invoice Date</th>
              <th className="border-b p-3 text-left">Due Date</th>
              <th className="border-b p-3 text-left">Department</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice._id}
                className={`hover:bg-[#E9F5FF] ${selected && selected.includes(invoice._id) ? 'bg-[#D9EBFF]' : ''}`}
              >
                <td className="border-b p-3">
                  <input
                    type="checkbox"
                    checked={selected && selected.includes(invoice._id)}
                    onChange={() => toggleSelect(invoice)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="border-b p-3 text-[#333333]">{invoice.vendorName || '-'}</td>
                <td className="border-b p-3 text-[#333333]">{invoice.invoiceNumber || '-'}</td>
                <td className="border-b p-3 text-[#333333]">
                  <span className={getStatusStyles(invoice.status)}>{invoice.status || '-'}</span>
                </td>
                <td className="border-b p-3 text-[#333333]">{formatAmount(invoice.netAmount) || '-'}</td>
                <td className="border-b p-3 text-[#333333]">{formatDate(invoice.invoiceDate) || '-'}</td>
                <td className="border-b p-3 text-[#333333]">{formatDate(invoice.dueDate) || '-'}</td>
                <td className="border-b p-3 text-[#333333]">{invoice.department || '-'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
