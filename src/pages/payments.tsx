import { useState, useEffect } from 'react';
import { getPayments } from '../api/payments';
// import styles from "./styles/Payments.module.css";
import styles from '../components/styles/Payments.module.css';

interface Payment {
  id: number;
  amount: number;
  description: string;
  created_at: string;
}

// interface PaymentsProps {
//   token: string;
// }

export const Payments = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data: any = await getPayments();
        setPayments(data.payments);
      } catch (err) {
        setError('Failed to fetch payments');
        console.error(err);
      }
    };
    fetchPayments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const newPayment = await createPayment(
      //   parseFloat(amount),
      //   description
      // );
      // setPayments([...payments, newPayment]);
      setAmount('');
      setDescription('');
    } catch (err) {
      setError('Failed to create payment');
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Payments</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Payment</button>
      </form>

      <h3>Payment History</h3>
      <ul>
        {payments &&
          payments.map(payment => (
            <li key={payment.id}>
              ${payment.amount} - {payment.description} (
              {new Date(payment.created_at).toLocaleString()})
            </li>
          ))}
      </ul>
    </div>
  );
};
