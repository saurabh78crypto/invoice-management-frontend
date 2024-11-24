import axiosInstance from '../utils/axiosInstance';

export const getInvoices = async ({status, searchQuery, page = 1, limit = 5}) => {
  try {
    const response = await axiosInstance.get('/invoices', {
      params: { status, searchQuery, page, limit },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching invoices", error);
    throw error; 
  }
};

export const createInvoice = async (invoiceData) => {
    try {
      const response = await axiosInstance.post('/invoices', invoiceData);
      return response.data; 
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error; 
    }
  };


export const updateInvoice = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/invoices/${id}`, updatedData);
    return response.data; 
  } catch (error) {
    console.error("Error updating invoice", error);
    throw error;
  }
};

export const deleteInvoice = async (id) => {
  try {
    await axiosInstance.delete(`/invoices/${id}`);
  } catch (error) {
    console.error("Error deleting invoice", error);
    throw error;
  }
};

