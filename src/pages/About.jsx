import React from "react";
import Navbar from "../component/Navbar";
import { UseFetch } from "../customhooks/UseFetch";
import { ErrorMessage, Field, Form, Formik } from "formik";

function About() {
  const { apiData, apiErr, apiLoading, fetchingData } = UseFetch({
    url: "https://jsonplaceholder.typicode.com/todos",
    method: "Post",
    autofetch: false,
  });

  return (
    <div className="relative">
      <Navbar />
      <div className="p-[5%]">
        <Formik
          initialValues={{ name: "", rollNo: "", department: "" }}
          onSubmit={async (values, { resetForm }) => {
            await fetchingData(values);
            resetForm();
          }}
        >
          <Form className="py-3 flex items-center gap-3">
            <div className="flex flex-col w-full">
              <label htmlFor="name"> Name</label>
              <Field
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="px-3 py-2 bg-gray-300 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="name"> Roll No</label>
              <Field
                type="text"
                name="rollNo"
                placeholder="Enter Your Roll No"
                className="px-3 py-2 bg-gray-300 rounded"
              />
              <ErrorMessage
                name="rollNo"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="name">Department</label>
              <Field
                type="text"
                name="department"
                placeholder="Enter Your Deparment"
                className="px-3 py-2 bg-gray-300 rounded"
              />
              <ErrorMessage
                name="department"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 mt-auto bg-blue-500 rounded text-white"
            >
            Submit
            </button>
          </Form>
        </Formik>

        <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left border border-gray-300 font-semibold">
                Id
              </th>
              <th className="px-4 py-3 text-left border border-gray-300 font-semibold">
                Name
              </th>
              <th className="px-4 py-3 text-left border border-gray-300 font-semibold">
                Roll No
              </th>
              <th className="px-4 py-3 text-left border border-gray-300 font-semibold">
                Department
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {apiLoading && (
              <tr>
                <td colSpan="4" className="text-center py-3">
                  Loading...
                </td>
              </tr>
            )}
            {apiErr && (
              <tr>
                <td colSpan="4" className="text-center text-red-500 py-3">
                  Error: {apiErr.message}
                </td>
              </tr>
            )}
            {apiData.map((items, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-3 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {items.name}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {items.rollNo}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {items.department}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default About;
