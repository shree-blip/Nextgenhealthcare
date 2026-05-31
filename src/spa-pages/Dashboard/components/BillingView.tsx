import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, MapPin, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { apiFetch } from '../../../lib/api';

// Inlined minimal tax-calculator (old project's @/lib/tax-calculator isn't ported;
// payment backend isn't ported either, so this is display-only).
function calculateTax(amount: number, country: string, state: string) {
  const usRates: Record<string, number> = {
    CA: 0.0725, NY: 0.04, TX: 0.0625, FL: 0.06, IL: 0.0625, PA: 0.06,
    OH: 0.0575, GA: 0.04, NC: 0.0475, MI: 0.06, NJ: 0.06625, VA: 0.043,
    WA: 0.065, AZ: 0.056, MA: 0.0625, TN: 0.07, IN: 0.07, MO: 0.04225,
    MD: 0.06, WI: 0.05, MN: 0.06875, CO: 0.029, AL: 0.04, SC: 0.06,
    LA: 0.0445, KY: 0.06, OR: 0, OK: 0.045, CT: 0.0635, UT: 0.0485,
    IA: 0.06, NV: 0.0685, AR: 0.065, MS: 0.07, KS: 0.065, NM: 0.05125,
    NE: 0.055, WV: 0.06, ID: 0.06, HI: 0.04, NH: 0, ME: 0.055, MT: 0,
    RI: 0.07, DE: 0, SD: 0.045, ND: 0.05, AK: 0, VT: 0.06, WY: 0.04,
  };
  const intlRates: Record<string, number> = {
    CA: 0.05, GB: 0.2, AU: 0.1, DE: 0.19, FR: 0.2, ES: 0.21, IT: 0.22,
    NL: 0.21, MX: 0.16,
  };
  let rate = 0;
  if (country === 'US') rate = usRates[state] ?? 0;
  else rate = intlRates[country] ?? 0;
  const subtotal = amount;
  const taxAmount = Math.round(subtotal * rate * 100) / 100;
  return { subtotal, taxRate: rate, taxAmount, total: subtotal + taxAmount };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

interface BillingViewProps {
  planId: string;
  planName: string;
  planPrice: number;
  onBack: () => void;
  onPaymentSuccess: () => void;
  setToast: (toast: { type: 'success' | 'error'; message: string }) => void;
}

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'MX', name: 'Mexico' },
];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

export default function BillingView({
  planId,
  planName,
  planPrice,
  onBack,
  onPaymentSuccess,
  setToast,
}: BillingViewProps) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [processing, setProcessing] = useState(false);
  const [taxData, setTaxData] = useState({
    subtotal: planPrice,
    taxRate: 0,
    taxAmount: 0,
    total: planPrice,
  });

  const handleCountryChange = (country: string) => {
    setFormData((prev) => ({ ...prev, country, state: '' }));
    setTaxData(calculateTax(planPrice, country, ''));
  };

  const handleStateChange = (state: string) => {
    setFormData((prev) => ({ ...prev, state }));
    setTaxData(calculateTax(planPrice, formData.country, state));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setFormData((prev) => ({ ...prev, cardNumber: value }));
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
    setFormData((prev) => ({ ...prev, cardExpiry: value }));
  };

  const handleCardCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    setFormData((prev) => ({ ...prev, cardCvc: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.fullName || !formData.billingAddress || !formData.city || !formData.country) {
      setToast({ type: 'error', message: 'Please fill in all required billing fields.' });
      return false;
    }
    if (formData.country === 'US' && !formData.state) {
      setToast({ type: 'error', message: 'Please select your state.' });
      return false;
    }
    if (!formData.zipCode) {
      setToast({ type: 'error', message: 'Please enter your postal code.' });
      return false;
    }
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      setToast({ type: 'error', message: 'Please enter a valid card number.' });
      return false;
    }
    if (!formData.cardExpiry || formData.cardExpiry.length !== 5) {
      setToast({ type: 'error', message: 'Please enter a valid expiry date (MM/YY).' });
      return false;
    }
    if (!formData.cardCvc || formData.cardCvc.length < 3) {
      setToast({ type: 'error', message: 'Please enter a valid CVC.' });
      return false;
    }
    return true;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setProcessing(true);
    try {
      await apiFetch('/api/stripe/process-payment', {
        method: 'POST',
        json: {
          planId,
          amount: taxData.total,
          subtotal: taxData.subtotal,
          taxAmount: taxData.taxAmount,
          taxRate: taxData.taxRate,
          billing: {
            email: formData.email,
            fullName: formData.fullName,
            address: formData.billingAddress,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
          card: {
            number: formData.cardNumber.replace(/\s/g, ''),
            expiry: formData.cardExpiry,
            cvc: formData.cardCvc,
          },
        },
      });

      setToast({ type: 'success', message: 'Payment successful! Your membership has been updated.' });
      setTimeout(() => onPaymentSuccess(), 1500);
    } catch (err) {
      console.error('Payment error:', err);
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Payment failed. Please try again.' });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Plans
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl p-8 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <h3 className="text-lg font-bold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-8 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Billing Address
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Street Address *</label>
                <input
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {formData.country === 'US' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select State</option>
                      {US_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-8 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Card Number *</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                  <input
                    type="text"
                    value={formData.cardExpiry}
                    onChange={handleCardExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVC *</label>
                  <input
                    type="text"
                    value={formData.cardCvc}
                    onChange={handleCardCvcChange}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-4">
                <AlertCircle className="h-3 w-3" />
                Your payment information is secure and will not be stored on our servers.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 bg-gradient-to-b from-emerald-50 to-white dark:from-slate-800 dark:to-slate-900">
            <h3 className="text-lg font-bold mb-6">Order Summary</h3>

            <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Plan</p>
              <p className="text-xl font-bold">{planName}</p>
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                <span className="font-semibold">{formatCurrency(taxData.subtotal)}</span>
              </div>
              {taxData.taxAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Tax ({(taxData.taxRate * 100).toFixed(1)}%)
                  </span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    +{formatCurrency(taxData.taxAmount)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-black text-emerald-600">{formatCurrency(taxData.total)}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Pay {formatCurrency(taxData.total)}
                </>
              )}
            </button>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
              By clicking Pay, you agree to our Terms of Service and authorize the charge to your card.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
