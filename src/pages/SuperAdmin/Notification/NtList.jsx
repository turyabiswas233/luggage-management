import React, { useEffect, useState } from "react";
import WelcomeBanner from "../../../partials/dashboard/WelcomeBanner";
import SuperAdminSidebar from "../../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../../partials/SuperAdminHeader";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../../config";
import Pagination from "../../Pagination";
function AllNotificationAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [currentPage, setPage] = useState(1);
  // Logic to calculate pagination
  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;

  const [activeId, setId] = useState(-1);
  const handleId = (e) => {
    setId(e);
    console.log(e);
  };

  const pageHandler = {
    increase: () => {
      setPage((p) => p + 1);
    },
    decrease: () => {
      setPage((p) => (p > 1 ? p - 1 : 1));
    },
  };
  const fetchNoti = async (p) => {
    const token = localStorage.getItem("token");

    const url = config.API_BASE_URL;
    const response = await axios.get(`${url}/api/v1/notifications/superadmin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      console.log("getAll");
    }
    setList(response.data?.notifications);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/logout");
      return;
    }
    fetchNoti(currentPage);
  }, []);
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  // Total number of pages
  const totalPages = Math.ceil(list.length / 10);

  // Change page
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    setId(-1);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SuperAdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden pb-20">
        {/* header */}
        <SuperAdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main>
          <div className="px-4 mt-32 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />
          </div>

          <div
            className={`xl:flex flex-row ${
              activeId > -1 && "xl:flex-row"
            } gap-2 px-5 mx-auto w-full max-w-screen-2xl justify-center`}
          >
            <div className="p-2 rounded-md bg-white w-fit max-w-xl mx-auto">
              <div className="text-center bg-teal-900 text-white py-3">
                Notification List
              </div>
              <div className="w-full grid grid-cols-3 py-2 bg-teal-500 text-black font-bold">
                {/* <p className="text-center">Id</p> */}
                <p className="text-center">Title</p>
                <p className="text-center">Time</p>
              </div>
              {currentItems.map((item, id) => {
                return (
                  <NotificationCard
                    key={id}
                    data={item}
                    id={id + 1}
                    onClick={() => handleId(id)}
                    active={activeId}
                  />
                );
              })}
            </div>
            {activeId > -1 && (
              <div className="mx-auto bg-black/20 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen z-50 p-2">
                <button
                  className="absolute right-4 top-4 bg-red-500 p-2 z-50 rounded-full flex items-center justify-center text-white"
                  onClick={() => handleId(-1)}
                >
                  <MdClose />
                </button>
                <div className="bg-white rounded-xl w-full h-full p-10 flex flex-col overflow-y-auto max-w-4xl mx-auto">
                  <p className="font-bold text-4xl">
                    {currentItems[activeId]?.title}
                  </p>
                  <p>
                    Published on:{" "}
                    {new Date(
                      currentItems[activeId]?.activationDate
                    )?.toLocaleString()}
                  </p>
                  <hr />
                  <div
                    className="my-2 quillText"
                    dangerouslySetInnerHTML={{
                      __html: currentItems[activeId]?.message?.replaceAll(
                        "&lt;",
                        "<"
                      ),
                    }}
                  >
                    {/* {currentItems[activeId]?.message?.toString()} */}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
}
const NotificationCard = ({ data, id, active, onClick }) => {
  return (
    <div
      className={`w-full grid grid-cols-3 group shadow-md hover:shadow-md shadow-black/10 items-center py-2 rounded-md my-2 hover:bg-teal-200 hover:text-teal-800 hover:shadow-teal-500/30 transition-all cursor-default ${
        active === id - 1 &&
        "bg-teal-200 text-teal-800 shadow-teal-500/30 ring-1 ring-teal-500"
      }`}
      onClick={onClick}
    >
      <p
        className={`hidden w-10 h-10 text-gray-800 bg-gray-500/30 group-hover:bg-gray-900 group-hover:text-gray-50 rounded-full items-center justify-center transition-colors mx-auto ${
          active === id - 1 && "bg-teal-500 text-teal-100"
        }`}
      >
        {id}
      </p>
      <p className="px-3 font-bold text-lg">{data?.title}</p>
      <p className="px-3 ">
        {new Date(data?.activationDate)?.toLocaleString()}
      </p>
    </div>
  );
};
export default AllNotificationAdmin;
