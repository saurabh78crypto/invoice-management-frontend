import { TextField, Menu, MenuItem, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useSnackbar } from 'notistack'; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import CreateInvoiceModal from '../Invoice/CreateInvoiceModal';
import { createInvoice, deleteInvoice } from '@/pages/api/invoiceApi';

const SearchBarWithActions = ({ onInvoiceCreate, selectedInvoice, setSelectedInvoice, onEditSubmit, onSearch, loading, setLoading, onInvoiceDelete }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); 
  const [isEdit, setIsEdit] = useState(false); 

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateInvoiceClick = () => {
    setIsEdit(false); 
    setModalOpen(true);
  };

  const handleEditClick = () => {
    if(!selectedInvoice) {
      enqueueSnackbar('No invoice selected for editing.', { variant: 'warning' });
      return;
    }

    if (selectedInvoice.length > 1) {
      enqueueSnackbar('Please select only one invoice.', { variant: 'error' });
      return;
    }
      
      setIsEdit(true);
      setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const handleSubmit = async (form) => {
    setLoading(true);
    try {
      if (isEdit) {
        await onEditSubmit(form); 
        setAnchorEl(null); 
      } else {
        const createdInvoice = await createInvoice(form); 
        await onInvoiceCreate(createdInvoice);

        enqueueSnackbar(`Invoice created for Vendor: ${createdInvoice.vendorName}`, { variant: 'success' });
      }
      handleCloseModal(); 
    } catch (error) {
      console.error('Failed to create invoice:', error);
      enqueueSnackbar('Failed to create invoice. Please try again.', { variant: 'error' });
    }
  };

  const handleDeleteClick = async () => {
    if (!selectedInvoice) {
      enqueueSnackbar('Invoice not selected.', { variant: 'warning' });
      return;
    } 
    
    try {
      await deleteInvoice(selectedInvoice._id); 
      onInvoiceDelete(selectedInvoice._id); 
      enqueueSnackbar('Invoice deleted successfully', { variant: 'success' });
      setAnchorEl(null); 
      setSelectedInvoice(null);
    } catch (error) {
      enqueueSnackbar('Failed to delete invoice. Please try again.', { variant: 'error' });
    }
  };
    

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <TextField
        style={{ width: '500px' }}
        placeholder="Search by Vendor or Invoice Number"
        variant="outlined"
        size="small"
        InputProps={{
          style: {
            height: 36,
            borderRadius: '8px',
          },
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon className='text-[#6B7280]' />
            </InputAdornment>
          )
        }}
        onChange={(e) => onSearch(e.target.value)}
      />

      <div className="flex space-x-4 items-center">
        <button
          className="bg-[#4C6F94] text-white px-4 py-2 rounded-lg shadow hover:bg-[#3a5477]"
          onClick={handleCreateInvoiceClick}
        >
          Create Invoice
        </button>

        <div>
          <button
            className="bg-[#4C6F94] text-white flex items-center px-4 py-2 rounded-lg shadow hover:bg-[#3a5477]"
            onClick={handleMenuOpen}
          >
            <span className="mr-2 font-medium">Actions</span>
            <KeyboardArrowDownIcon />
          </button>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
              },
            }}
          >
            <MenuItem onClick={handleEditClick} disabled={!selectedInvoice}> Edit </MenuItem>
            <MenuItem onClick={handleDeleteClick} disabled={!selectedInvoice}>Delete</MenuItem>
          </Menu>
        </div>
      </div>

      <CreateInvoiceModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editMode={isEdit}
        loading={loading}
        invoiceData={isEdit ? selectedInvoice : null} 
      />
    </div>
  );
};

export default SearchBarWithActions;
