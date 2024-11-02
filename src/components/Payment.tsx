import React, { useState } from "react";

const Payment: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const handlePayment = () => {
    // Implement payment handling and navigate to confirmation page
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Fund Artwork</h1>
      <form onSubmit={handlePayment} className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Card Number"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          placeholder="Expiry Date (MM/YY)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          placeholder="CVV"
          className="w-full p-2 border rounded"
          required
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={saveCard}
            onChange={() => setSaveCard(!saveCard)}
            className="mr-2"
          />
          Save card for future payments
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
