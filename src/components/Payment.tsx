import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PaymentService } from "../services/PaymentService";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { useUser } from "../context/UserContext";

export const PaymentPage: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  // State management
  const [amount, setAmount] = useState<number | "">(""); // Empty by default
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card");
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: "",
    expiryDate: new Date(), // Default to today's date
    cvv: "",
  });
  const [paypalEmail, setPaypalEmail] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    bankName: "",
    routingNumber: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle payment submission
  const handlePayment = async () => {
    // Validate inputs
    if (typeof amount !== "number" || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (
      paymentMethod === "credit_card" &&
      (!creditCardDetails.cardNumber ||
        !creditCardDetails.expiryDate ||
        !creditCardDetails.cvv)
    ) {
      setError("Please fill out all credit card details.");
      return;
    }

    if (paymentMethod === "paypal" && !paypalEmail) {
      setError("Please enter your PayPal email.");
      return;
    }

    if (
      paymentMethod === "bank_transfer" &&
      (!bankDetails.accountNumber ||
        !bankDetails.bankName ||
        !bankDetails.routingNumber)
    ) {
      setError("Please fill out all bank transfer details.");
      return;
    }

    // Proceed with payment
    setError(null);
    setIsProcessing(true);

    try {
      const paymentData: any = {
        amount,
        currency: "USD",
        donationId: postId,
        userId: user?.id, // Replace with actual user ID
        token: user?.token, // Replace with actual auth token
        paymentMethod,
      };

      if (paymentMethod === "credit_card") {
        Object.assign(paymentData, creditCardDetails);
      } else if (paymentMethod === "paypal") {
        paymentData.paypalEmail = paypalEmail;
      } else if (paymentMethod === "bank_transfer") {
        Object.assign(paymentData, bankDetails);
      }

      await PaymentService.createPayment(paymentData);
      alert("Payment successful!");
      navigate("/"); // Redirect after payment
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Render payment fields dynamically
  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "credit_card":
        return (
          <>
            <input
              type="text"
              value={creditCardDetails.cardNumber}
              onChange={(e) =>
                setCreditCardDetails((prev) => ({
                  ...prev,
                  cardNumber: e.target.value,
                }))
              }
              placeholder="Card Number"
              className="w-full border p-2 rounded mb-4"
              autoComplete="off"
            />
            <div className="mb-4">
              <ReactDatePicker
                selected={creditCardDetails.expiryDate}
                onChange={(date: Date | null) =>
                  setCreditCardDetails((prev) => ({
                    ...prev,
                    expiryDate: date || new Date(), // Handle null by defaulting to the current date
                  }))
                }
                dateFormat="MM/yyyy"
                showMonthYearPicker // Restricts picker to Month/Year
                placeholderText="Expiry Date (MM/YYYY)"
                className="w-full border p-2 rounded"
              />
            </div>
            <input
              type="text"
              value={creditCardDetails.cvv}
              onChange={(e) =>
                setCreditCardDetails((prev) => ({
                  ...prev,
                  cvv: e.target.value,
                }))
              }
              placeholder="CVV"
              className="w-full border p-2 rounded mb-4"
              autoComplete="off"
            />
          </>
        );
      case "paypal":
        return (
          <input
            type="email"
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
            placeholder="PayPal Email"
            className="w-full border p-2 rounded mb-4"
            autoComplete="off"
          />
        );
      case "bank_transfer":
        return (
          <>
            <input
              type="text"
              value={bankDetails.accountNumber}
              onChange={(e) =>
                setBankDetails((prev) => ({
                  ...prev,
                  accountNumber: e.target.value,
                }))
              }
              placeholder="Account Number"
              className="w-full border p-2 rounded mb-4"
              autoComplete="off"
            />
            <input
              type="text"
              value={bankDetails.bankName}
              onChange={(e) =>
                setBankDetails((prev) => ({
                  ...prev,
                  bankName: e.target.value,
                }))
              }
              placeholder="Bank Name"
              className="w-full border p-2 rounded mb-4"
              autoComplete="off"
            />
            <input
              type="text"
              value={bankDetails.routingNumber}
              onChange={(e) =>
                setBankDetails((prev) => ({
                  ...prev,
                  routingNumber: e.target.value,
                }))
              }
              placeholder="Routing Number"
              className="w-full border p-2 rounded mb-4"
              autoComplete="off"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="payment-page w-screen mx-auto bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Make a Payment</h2>
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            $
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value ? Number(e.target.value) : "")
            }
            placeholder="Enter amount"
            className="w-full border p-2 pl-8 rounded"
            min="0"
            step="0.01"
          />
        </div>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>
        {renderPaymentFields()}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};
