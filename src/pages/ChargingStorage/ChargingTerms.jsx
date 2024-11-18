import React from "react";

function ChargingTerms() {
  const lists = [
    {
      title: "Service Overview",
      nestedList: [
        {
          title:
            "URLoker Charging Station offers device-charging services for customers needing quick power boosts for mobile phones, tablets or other small electronic devices.",
          nestedList: [
            {
              title: "5 minutes at a rate of AUD $6",
            },
            {
              title: "10 minutes at a rate of AUD $10",
            },
          ],
        },
      ],
    },
    {
      title: "Device Handling and Responsibility",
      nestedList: [
        {
          title:
            "Customers are required to hand over their devices to the designated URLoker staff for charging.",
        },
        {
          title:
            "URLoker takes every precaution to handle devices carefully but we are not responsible for any pre-existing damages, battery health issues or other device-related complications.",
        },
        {
          title:
            "URLoker is not liable for any data loss or settings changes that may occur while the device is in our care.",
        },
      ],
    },
    {
      title: "Payment Terms",
      nestedList: [
        {
          title:
            "Payment must be made in full upfront for the selected charging option (5 or 10 minutes).",
        },
        {
          title:
            "The payment is non-refundable one the charging session begins.",
        },
        {
          title:
            "Payment cn be made via cash, card or any other accepted method as specified by URLoker",
        },
      ],
    },
    {
      title: "Waiting Area",
      nestedList: [
        {
          title:
            "Customers are welcome to remain in the designated waiting area while their device charges.",
        },
        {
          title:
            "URLoker is not responsible for personal belongings left unattended in the waiting area.",
        },
      ],
    },
    {
      title: "Service Limitaitons and Disclaimer",
      nestedList: [
        {
          title:
            "Chargin times are fixed at either 5 or 10 minutes. Customers are responsible for collecting their devices promptly at the end of the chosen session.",
        },
        {
          title:
            "URLoker does not guarantee a specific charge level after 5 or 10 minutes of charging due to differences in battery capacity, device conditon, and other factors.",
        },
        {
          title:
            "URLoker reserves the right to deny service if the device appears unsafe to charge, such as dure to physical damage or suspected battery issues.",
        },
      ],
    },
    {
      title: "Liability and Warranty",
      nestedList: [
        {
          title:
            "Urloker is not liavle for any indirect, incidental or consequential damages resulting from using the charging service.",
        },
        {
          title:
            "The charing service is provided 'as is,' without any warranty, express or implied, on the speed or effectiveness of charging.",
        },
      ],
    },
    {
      title: "Changes to Terms",
      nestedList: [
        {
          title:
            "URLoker reserves the right to modify these terms and conditions at any time. Any changes will be posted on our website and/or displayed at the charging station.",
        },
      ],
    },
    {
      title: "Accpetance of Terms",
      nestedList: [
        {
          title:
            "By using the URLoker <a href='/charging-location'><u><b>Charging Station</b></u></a>, customers acknowledge and agree to there terms and conditions.",
        },
      ],
    },
  ];
  return (
    <div className="p-10 max-w-screen-xl text-base text-justify mx-auto text-slate-900">
      <header className="mb-20">
        <h1 className="font-bold text-4xl lg:text-5xl">
          Terms and Conditions for Urloker Charging Station
        </h1>
        <p>
          Welcome to Urloker Charging Station. By using our charging station
          services, you are agreeing to the following terms and conditions:
        </p>
      </header>

      <main>
        <ul className="space-y-6">
          {lists.map((list, index) => (
            <li className="list-decimal" key={index}>
              <ListView title={list.title} nestedList={list.nestedList} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
const ListView = ({ title, nestedList = [], type }) => {
  return (
    <div className=" ">
      <h2 className="font-semibold text-2xl mb-2">{title}</h2>
      <ul className={`list-disc px-5`}>
        {nestedList.map((item, index) => (
          <li key={index} className="mb-1">
            <p dangerouslySetInnerHTML={{ __html: item?.title }} />
            {item.nestedList && item.nestedList.length > 0 && (
              <ListView
                title=""
                nestedList={item?.nestedList || []}
                type={item?.type}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ChargingTerms;
