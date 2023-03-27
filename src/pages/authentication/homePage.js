import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "rgb(217, 243, 253)" }}>
      {/* Header Section */}
      <section className="bg-white py-2 mb-3 border-b">
        <div className="p-4 container mx-auto flex justify-between items-center">
          {/* Logo here */}
          <img
            className="mb-0 rounded-xl shadow-md"
            src="img.png"
            width={250}
            alt="unicef"
          />
          <div className="p-4 flex items-center justify-between">
            <div className="text-m pt-1 ml-3 p-2">
              <a
                href="mailto:jmabea@unicef.org"
                className="text-sky-400 px-4 py-2"
              >
                CONTACT
              </a>
            </div>
            <div className="text-m pt-1 ml-3 p-2">
              <a href="/suppliers" className="text-sky-400 px-4 py-2">
                SUPPLIERS
              </a>
            </div>
            <div className="text-m pt-1 ml-3 p-2">
              <Link
                to="/login"
                className=" text-xl bg-sky-400 text-white 
            font-bold px-4 py-3 rounded-md transition"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* End of Header Section */}

      <section className="p-6 py-6 mb-10 border-b">
        <div className="container mx-auto">
          <div className="bg-white container mx-auto flex justify-between items-center mb-5 rounded-xl shadow-md p-4">
            <h1 className="text-l text-sky-400 font-bold">TRACKIT - EUM</h1>
            <p className="text-m pt-1 ml-10">
              Trackit-Eum is a multitasked App made up of 5 main modules and
              other sub-modules for the Admin and 3 modules. Mainly:{" "}
              <b>
                Users management, Organisations management, Supply and Logistics
              </b>{" "}
              (Transfer, Product tracing, reported issues, IP inventory and
              supply), <b>End User Monitoring and Monitoring Visit</b>. The
              mentioned modules allow for data collection for administration and
              items tracking for better decision making.
            </p>
          </div>

          <div className="grid grid-cols-1 ">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="bg-white relative z-0 w-full mb-6 group rounded-xl shadow-md p-4">
                <h1 className="text-l text-sky-400 font-semibold">
                  WHAT MAKES IT DIFFERENT FROM OTHER APPS?
                </h1>
                <p className="text-m pt-3">
                  Trackit-Eum is not just a tracking Application, it is use as a
                  stock management system and has the easiness to enable it
                  users to gain in time and become more efficient and effective
                  with their tasks. It ends the truggle of a working trying to
                  do Maths while they have other occupations. With Trackit-Eum,
                  every task is automated and with just a few clicks the user is
                  satisfied. All programmes and operations of UNICEF are managed
                  with this Application.
                </p>
              </div>

              <div className="bg-white relative z-0 w-full mb-6 group rounded-xl shadow-md p-4">
                <h1 className="text-l text-sky-400 font-semibold">VERSIONS</h1>
                <ol class="list-decimal text-m">
                  <li className="m-4">
                    <b>Web App:</b> The web version of Trackit-Eum is solely
                    accessible on the Web and has a dashboard for the
                    Administrator(s).
                  </li>
                  <li className="m-4">
                    <b>Mobile App:</b> This version of the App is available for
                    all Android Devices and downloadable on Google Play Store.
                  </li>
                </ol>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="bg-white relative z-0 w-full mb-6 group rounded-xl shadow-md p-4">
                <h1 className="text-l text-sky-400 font-semibold">
                  {" "}
                  TYPES OF USERS
                </h1>
                <ol class="list-decimal  text-m">
                  <li className="m-4">
                    <b>The Administrator(s):</b>They have the role of
                    administrator and has total access of the Application; they
                    must be a staff of UNICEF.
                  </li>
                  <li className="m-4">
                    <b>UNICEF Staff:</b> They are users who only have access to
                    some features of the Application and must work with UNICEF.
                  </li>
                  <li className="m-4">
                    <b>Implementing Partner(IPs):</b> They solely have access to
                    the parts that concern their task such as acknowledgment of
                    items received, Dispatch of items to end users and inventory
                    of their stock.
                  </li>
                </ol>
              </div>

              <div className="bg-white relative z-0 w-full mb-6 group rounded-xl shadow-md p-4">
                <h1 className="text-l text-sky-400 font-semibold">
                  USER CREATION
                </h1>
                <ol class="list-decimal text-m">
                  <li className="m-4">
                    There is a <b>Super Administrator</b> who creates an admin
                    for UNICEF who will create UNICEF users as well as
                    Implementing Partners users.
                  </li>
                  <li className="m-4">
                    Each user is assigned a role/privilege that gives them
                    access to only a certain feature of the Application.
                  </li>
                  <li className="m-4">
                    Upon user creation, a login credentials (username and
                    password) is sent to the created user via email.
                  </li>
                  <li className="m-4">
                    The user uses the same credentials on the web as well as on
                    Mobile.
                  </li>
                  <li className="m-4">
                    The user has the possibility to change their password.
                  </li>
                </ol>
                <i className="text-m font-semibold">
                  For more details, kindly refer to the user guide by requesting
                  it from the Administrator of UNICEF
                </i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-2 mb-1 border-b">
        <div className="container flex justify-between items-center">
          <div className="items-center mx-auto">
            <p
              to=""
              className="bg-sky-400 text-white 
            font-bold px-4 py-2 rounded-md transition"
            >
              ©{" "}
              <span id="currentYear">
                {new Date().getUTCFullYear()},TRACKIT-EUM: A Product of UNICEF
                Guinea-Bissau{" "}
              </span>
            </p>
          </div>
        </div>
      </section>
      {/* End of Header Section */}
    </div>
  );
}
