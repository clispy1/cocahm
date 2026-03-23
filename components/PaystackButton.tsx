"use client";

import React from 'react';
import { usePaystackPayment } from 'react-paystack';

export default function PaystackButton({ formData, onSuccess, onClose, children, className }: { formData: any, onSuccess: (ref: any) => void, onClose: () => void, children: React.ReactNode, className?: string }) {
  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: 50000, // 500 GHS in pesewas
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <button
      type="button"
      onClick={() => initializePayment({ onSuccess, onClose })}
      className={className}
    >
      {children}
    </button>
  );
}
