import { Dialog, TextField, Button, MenuItem, Select, InputLabel, FormControl, InputAdornment, FormHelperText } from '@mui/material';
import { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';

const CreateInvoiceModal = ({ open, onClose, onSubmit, editMode = false, invoiceData = null, loading }) => {
  const [form, setForm] = useState({
    vendorName: '',
    invoiceNumber: '',
    status: '',
    netAmount: '',
    invoiceDate: null,
    dueDate: null,
    department: '',
    poNumber: '',
    createdTime: new Date().toLocaleTimeString(), 
    createdDate: new Date().toLocaleDateString(), 
  });

  const [errors, setErrors] = useState({}); 

  useEffect(() => {
    if (editMode && invoiceData) {
      setForm({
        ...invoiceData,
        invoiceDate: new Date(invoiceData.invoiceDate),
        dueDate: new Date(invoiceData.dueDate),
      });
    }
  }, [editMode, invoiceData]);

  useEffect(() => {
    if (!open) {
      setErrors({});
      if (!editMode) {
        setForm({
          vendorName: '',
          invoiceNumber: '',
          status: '',
          netAmount: '',
          invoiceDate: null,
          dueDate: null,
          department: '',
          poNumber: '',
          createdTime: new Date().toLocaleTimeString(),
          createdDate: new Date().toLocaleDateString(),
        });
      }
    }
  }, [open, editMode]);

  const validateForm = () => {
    let formErrors = {};
    if (!form.vendorName) formErrors.vendorName = "Vendor Name is required";
    if (!form.invoiceNumber) formErrors.invoiceNumber = "Invoice Number is required";
    if (!form.netAmount || isNaN(form.netAmount) || form.netAmount <= 0) formErrors.netAmount = "Net Amount must be a positive number";
    if (!form.invoiceDate) formErrors.invoiceDate = "Invoice Date is required";
    if (!form.dueDate) formErrors.dueDate = "Due Date is required";
    if (!form.status) formErrors.status = "Status is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name]; 
        return newErrors;
      });
    }
  };

  const handleDateChange = (name, value) => {
    setForm({ ...form, [name]: value });
    
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name]; 
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(form);
      onClose(); 
    }
  };

  const handleCancel = () => {
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Invoice" : "Create Invoice"}</h2>

        <TextField
          name="vendorName"
          label="Vendor Name"
          fullWidth
          value={form.vendorName}
          onChange={handleChange}
          error={!!errors.vendorName}
          helperText={errors.vendorName}
        />

        <TextField
          name="invoiceNumber"
          label="Invoice Number"
          fullWidth
          value={form.invoiceNumber}
          onChange={handleChange}
          error={!!errors.invoiceNumber}
          helperText={errors.invoiceNumber}
        />

        <FormControl fullWidth error={!!errors.status}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={form.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="Awaiting Approval">Awaiting Approval</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
          </Select>
          {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
        </FormControl>

        <TextField
          name="netAmount"
          label="Net Amount"
          fullWidth
          value={form.netAmount}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          error={!!errors.netAmount}
          helperText={errors.netAmount}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Invoice Date"
            inputFormat="dd/MM/yyyy"
            value={form.invoiceDate}
            onChange={(newValue) => handleDateChange('invoiceDate', newValue)}
            renderInput={(params) => 
              <TextField 
                {...params} 
                fullWidth 
                error={!!errors.invoiceDate}
                helperText={errors.invoiceDate}
              />
            }
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Due Date"
            inputFormat="dd/MM/yyyy"
            value={form.dueDate}
            onChange={(newValue) => handleDateChange('dueDate', newValue)}
            renderInput={(params) => 
              <TextField 
                {...params} 
                fullWidth 
                error={!!errors.dueDate}
                helperText={errors.dueDate}
              />
            }
          />
        </LocalizationProvider>

        <TextField
          name="department"
          label="Department"
          fullWidth
          value={form.department}
          onChange={handleChange}
        />

        <TextField
          name="poNumber"
          label="PO Number"
          fullWidth
          value={form.poNumber}
          onChange={handleChange}
        />

        <div className="flex justify-end space-x-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            className="px-6 py-2"
          >
            Cancel
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="px-6 py-2"
            disabled={loading}
          >
            {editMode ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateInvoiceModal;
