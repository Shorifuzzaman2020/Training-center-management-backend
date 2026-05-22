// import SSLCommerzPayment from "sslcommerz-lts";

// const store_id = "kineo6a0f3f698a669";
// const store_passwd = "kineo6a0f3f698a669@ssl";
// const is_live = false; // sandbox

// export const initPayment = async (courseId: string, amount: number) => {
//   const transactionId = "TXN_" + Date.now();

//   const data = {
//     total_amount: amount,
//     currency: "BDT",
//     tran_id: transactionId,

//     success_url: `http://localhost:3000/payment-success?courseId=${courseId}`,
//     fail_url: "http://localhost:3000/payment-fail",
//     cancel_url: "http://localhost:3000/payment-cancel",

//     ipn_url: "http://localhost:5000/api/v1/payment/ipn",

//     shipping_method: "NO",
//     product_name: "Course Payment",
//     product_category: "Education",
//     product_profile: "general",

//     cus_name: "Student",
//     cus_email: "test@gmail.com",
//     cus_add1: "Dhaka",
//     cus_city: "Dhaka",
//     cus_country: "Bangladesh",
//     cus_phone: "01700000000",
//   };

//   const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

//   const apiResponse = await sslcz.init(data);

//   return {
//     url: apiResponse.GatewayPageURL,
//     transactionId,
//   };
// };


import SSLCommerzPayment from "sslcommerz-lts";

const store_id = "kineo6a0f3f698a669";
const store_passwd = "kineo6a0f3f698a669@ssl";
const is_live = false;

export const initPayment = async (
  admissionId: string,
  amount: number,
  email: string
) => {

  const transactionId = "TXN_" + Date.now();

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: transactionId,

    success_url: `http://localhost:5000/api/v1/payment/success`,
    fail_url: `http://localhost:3000/payment-fail`,
    cancel_url: `http://localhost:3000/payment-cancel`,

    ipn_url: "http://localhost:5000/api/v1/payment/ipn",

    // 🔥 VERY IMPORTANT
    value_a: admissionId,
    value_b: email,

    shipping_method: "NO",
    product_name: "Course Payment",
    product_category: "Education",
    product_profile: "general",

    cus_name: "Student",
    cus_email: email,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: "01700000000",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const apiResponse = await sslcz.init(data);

  return {
    url: apiResponse.GatewayPageURL,
    transactionId,
  };
};