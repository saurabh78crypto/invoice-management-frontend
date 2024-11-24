import { useEffect, useState, useCallback  } from 'react';
import { useSnackbar } from 'notistack'; 
import Layout from '../components/Layout/Layout';
import FilterBar from '../components/Invoice/FilterBar';
import SearchBarWithActions from '../components/Invoice/SearchBarWithActions';
import InvoiceTable from '../components/Invoice/InvoiceTable';
import { getInvoices, updateInvoice } from './api/invoiceApi';
import Pagination from '@/components/Layout/Pagination';
import { debounce } from './utils/debounce';

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const [invoiceList, setInvoiceList] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);


  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const data = await getInvoices({page, status: selectedStatus, searchQuery});
      setInvoiceList(data.invoices);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching invoices', error);
      setInvoiceList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [selectedStatus, searchQuery, page]);

  const handleInvoiceCreate = async (newInvoice) => {
    setInvoiceList((prevList) => [newInvoice, ...prevList]); 
    await fetchInvoices();
  };

  const handleInvoiceDelete = (id) => {
    setInvoiceList((prevList) => prevList.filter(invoice => invoice._id !== id)); 
  };
  

  const handleEditSelect = (invoice) => {
    setSelectedInvoice(invoice);
    console.log('Selected Invoice on Edit:', invoice);
  };

  const handleDeselect = () => {
    setSelectedInvoice(null);
  };

  const handleFilter = (status) => {
    setSelectedStatus(status); 
    setPage(1);
  };

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setPage(1);
    }, 500), 
    []
  );

  const handlePageChange = (newPage) => {
    if(newPage > 0 && newPage <= totalPages){
      setPage(newPage);
    }
  };

  const handleEditSubmit = async (updatedInvoice) => {
    if (!updatedInvoice._id){
      console.error('Invoice ID is missing');
      return;
    }
    try {
      await updateInvoice(updatedInvoice._id, updatedInvoice); 
      await fetchInvoices();
      
      enqueueSnackbar('Invoice updated successfully', { variant: 'success' });
      setSelectedInvoice(null);
    } catch (error) {
      enqueueSnackbar('Failed to update invoice. Please try again.', { variant: 'error' });
    }
  };
  


  return (
    <Layout>
    <FilterBar selectedStatus={selectedStatus} onFilter={handleFilter} />
    <SearchBarWithActions
      onInvoiceCreate={handleInvoiceCreate}
      onInvoiceDelete={handleInvoiceDelete}
      selectedInvoice={selectedInvoice}
      setSelectedInvoice={setSelectedInvoice}
      onEditSubmit={handleEditSubmit}
      onDeselect={handleDeselect}
      onSearch={handleSearch}
      loading={loading}
      setLoading={setLoading}
    />
    {loading ? (
      <div className="loader">Loading...</div>
    ) : invoiceList.length === 0 ? (
      <div className="no-data">
        {searchQuery 
          ? "No such invoice found." 
          : selectedStatus !== "All"
            ? "No invoices found for this status."
            : "No invoices available."
        }
      </div>
    ) : (
      <>
        <InvoiceTable
          invoices={invoiceList}
          selectedInvoice={selectedInvoice}
          setSelectedInvoice={setSelectedInvoice}
          onEditSelect={handleEditSelect}
          onDeselect={handleDeselect}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    )}
  </Layout>

  );
}
