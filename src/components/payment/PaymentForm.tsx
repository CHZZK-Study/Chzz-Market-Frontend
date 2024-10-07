/* eslint-disable prettier/prettier */
// src/components/PaymentForm.tsx

// import React, { useState, useEffect } from 'react';
// import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
// import { toast } from 'sonner';

const PaymentForm: React.FC = () => {
  return <></>;
};
//   const [amount, setAmount] = useState<number>(0);
//   const [orderId, setOrderId] = useState<string>('');
//   const [orderName, setOrderName] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);
//   const [tossPayments, setTossPayments] = useState<any>(null);

//   useEffect(() => {
//     const initializeTossPayments = async () => {
//       const toss = await loadTossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY);
//       setTossPayments(toss);
//     };
//     initializeTossPayments();
//   }, []);

//   console.log(tossPayments);

//   const handlePayment = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const paymentData = {
//       amount,
//       orderId,
//       orderName,
//       failUrl: 'https://yourdomain.com/payment-fail',
//       // 필요한 다른 필드들 추가
//     };

//     try {
//       const response = await initiatePayment(paymentData);
//       console.log(response, paymentData);
//     } catch (err: any) {
//       setError(err.message);
//       toast.error(err.message); // 에러 메시지를 사용자에게 표시
//     }
//   };

//   return (
//     <form onSubmit={handlePayment}>
//       <div>
//         <label htmlFor='amount'>금액:</label>
//         <input
//           id='amount'
//           type='number'
//           value={amount}
//           onChange={(e) => setAmount(parseInt(e.target.value, 10))}
//         />
//       </div>
//       <div>
//         <label htmlFor='orderId'>주문 ID:</label>
//         <input
//           id='orderId'
//           type='text'
//           value={orderId}
//           onChange={(e) => setOrderId(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor='orderName'>주문명:</label>
//         <input
//           type='text'
//           value={orderName}
//           onChange={(e) => setOrderName(e.target.value)}
//         />
//       </div>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <button type='submit'>결제하기</button>
//     </form>
//   );
// };

// const initiatePayment = async (paymentData: any) => {
//   // Implement the payment initiation logic here
//   // This is a placeholder function
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('Payment successful');
//       console.log(reject);
//     }, 1000);
//   });
// };

export default PaymentForm;
