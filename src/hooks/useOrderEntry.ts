import { useState, useCallback } from 'react';
import { sendTrade } from '../services';
import { OrderFormData, SubmittedOrder } from '../types';

export const useOrderEntry = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<SubmittedOrder | null>(null);

  const submitOrder = useCallback(async (orderData: OrderFormData): Promise<SubmittedOrder> => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await sendTrade(orderData);
      setSuccess(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to submit order';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return { submitOrder, submitting, error, success, clearMessages };
};

