import React from "react";
const logo = "/icons/android-chrome-192x192.png";

function Invoice() {
  const invoiceData = {
    invoiceNumber: "674bcc32c5c827fda07e6782",
    invoiceDate: "Wednesday, December 4th, 2024",
    status: "PAID",
    customer: {
      name: "Animesh Kar",
      address: "48, Chamelibagh, Shantinagar, Dhaka-1217",
      city: "Dhaka",
      state: "",
      country: "Bangladesh",
    },
    company: {
      name: "EBNHOST LIMITED",
      address: "5th Floor, House: 105, 6/1 Central Road, Dhanmondi, Dhaka-1209",
      contact: "01711242632",
    },
    items: [
      {
        description:
          "Domain Registration - imranulmedinmusic.com - 1 Years (04/12/2024 - 03/12/2025)",
        amount: "15.00 AUD",
      },
      // Add more items here
    ],
    subtotal: "15.00 AUD",
    credit: "0.00 AUD",
    total: "15.00 AUD",
    paymentMethod: "stripe",
  };

  return (
    <div className="block bg-white w-full max-w-screen-lg rounded-md my-10 mx-auto p-20 shadow-xl">
      <header className="font-bold my-5 w-full border-b border-gray-200 pb-5">
        <img src={logo} width={100} height={100} alt="logo" />
        <div className="logo">{/* Add your logo here */}</div>
        <h1 className="text-3xl ">Invoice #{invoiceData.invoiceNumber}</h1>
        <p>Date: {invoiceData.invoiceDate}</p>
        <p>Status: {invoiceData.status}</p>
      </header>

      <div className="grid grid-cols-2">
        <div className="invoiced-to text-left">
          <h3 className="font-bold text-xl">Invoiced To</h3>
          <p>{invoiceData.customer.name}</p>
          <p>{invoiceData.customer.address}</p>
          <p>
            {invoiceData.customer.city}, {invoiceData.customer.state}
          </p>
          <p>{invoiceData.customer.country}</p>
        </div>

        <div className="pay-to text-right">
          <h3 className="font-bold text-xl">Pay To</h3>
          <p>{invoiceData.company.name}</p>
          <p>{invoiceData.company.address}</p>
          <p>Contact: {invoiceData.company.contact}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 my-5">
        <div>
          <p className="font-bold text-xl">Invoice Date </p>
          <p>{invoiceData.invoiceDate}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl">Payment Method</p>
          <p>{invoiceData.paymentMethod}</p>
        </div>
      </div>

      <table className="border border-gray-400 rounded-md my-10 w-full">
        <thead className="font-bold">
          <tr className="bg-gray-200 ">
            <th className="text-left p-2" colSpan={3}>
              Invoice Items
            </th>
          </tr>
          <tr>
            <th className="text-left p-2" colSpan={2}>
              Description
            </th>
            <th className="text-center p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td className="p-2 border-t border-gray-200" colSpan={2}>
                {item.description}
              </td>
              <td className="p-2 border-t border-gray-200">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="divide-y-2 divide-gray-300 bg-gray-100">
        <p className="p-2 text-right">Subtotal: {invoiceData.subtotal}</p>
        <p className="p-2 text-right">Credit: {invoiceData.credit}</p>
        <p className="p-2 text-right">Total: {invoiceData.total}</p>
      </div>
    </div>
  );
}

export default Invoice;
