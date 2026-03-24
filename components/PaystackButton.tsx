"use client";

import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function PaystackButton({ formData, onSuccess, onClose, onBeforePayment, children, className, disabled }: { formData: any, onSuccess: (ref: any) => void, onClose: () => void, onBeforePayment?: () => boolean | Promise<boolean>, children: React.ReactNode, className?: string, disabled?: boolean }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (onBeforePayment) {
      const canProceed = await onBeforePayment();
      if (!canProceed) return;
    }

    if (!scriptLoaded || !window.PaystackPop) {
      alert('Paystack is still loading. Please try again in a moment.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      email: formData.email,
      amount: 10000, // 100 GHS in pesewas
      currency: 'GHS',
      ref: (new Date()).getTime().toString(),
      callback: (response: any) => {
        onSuccess(response);
      },
      onClose: () => {
        onClose();
      },
    });

    handler.openIframe();
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      className={className}
      disabled={disabled || !scriptLoaded}
    >
      {children}
    </button>
  );
}
