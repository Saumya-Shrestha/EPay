import { useState, useEffect } from 'react';
import axios from 'axios';

type PaymentHistoryItem = {
  serialNumber: string;
  consumerId: string;
  _id: string;
  penalty: string;
  month: string;
  userId: string;
  orderId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  __v: number;
};

type PaymentHistoryResponse = PaymentHistoryItem[];

const TableTwo = () => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryResponse>([]);
  const uid = localStorage.getItem('userId');

  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/history/${uid}`);
      setPaymentHistory(response.data.paymentHistory);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      // Check if month, consumerID, and SCNO are present in local storage
      const month = localStorage.getItem('month');
      const consumerId = localStorage.getItem('consumerID');
      const serialNumber = localStorage.getItem('scNo');

      if (month && consumerId && serialNumber) {
        try {
          // Call the API to update payment status
          await axios.put(`http://localhost:5000/payments/${serialNumber}/${consumerId}/${month}`);
          // Remove values from local storage after updating
          localStorage.removeItem('month');
          localStorage.removeItem('consumerID');
          localStorage.removeItem('scNo');
          // Fetch updated payment history
          fetchPaymentHistory();
        } catch (error) {
          console.error('Error updating payment status:', error);
        }
      }
    };

    updatePaymentStatus();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">NEA Billing History</h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">SCNO</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">ConsumerID</p>
        </div>
        <div className="col-span-1 hidden sm:flex items-center">
          <p className="font-medium">Amount</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Penalty</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">For Month</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
      </div>

      {paymentHistory.map((payment, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{payment.serialNumber}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{payment.consumerId}</p>
          </div>
          <div className="col-span-1 hidden sm:flex items-center">
            <p className="text-sm text-black dark:text-white">{payment.totalAmount}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-red-500 dark:text-white">{payment.penalty}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{payment.month}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p style={{ color: payment.status === 'Paid' ? '#086908' : '#8f0808' }} className="text-sm dark:text-white">{payment.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
