// src/services/PaymentService.ts
import axios from "axios";
const API_URL = "http://localhost:3000/payment";

export const PaymentService = {
  async createPayment(paymentData: {
    amount: number;
    currency: string;
    paymentMethod: string;
    donationId: string;
    userId: string;
    token: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    paypalEmail?: string;
    accountNumber?: string;
    bankName?: string;
    routingNumber?: string;
  }) {
    const { token, ...data } = paymentData;
    const response = await axios.post(`${API_URL}/createTransaction`, data, {
      headers: { Authorization: token },
    });
    return response.data;
  },
};
//  async createPost(
//     postData: { title: string; body: string; artistId: any },
//     token: string
//   ) {
//     const data = { post: postData };
//     try {
//       const response = await axios.post(
//         `${API_URL}/createPost`,
//         JSON.stringify(data),
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || "Failed to create post");
//     }
//   },
