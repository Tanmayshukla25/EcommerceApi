import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Contact() {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    Phonenumber: "",
    textarea: "",
  });

  const [save, setSavedData] = useState([]);

  function handel(e) {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSavedData([...save, formdata]);
    toast.success("Form submitted successfully!", {
      position: "bottom-right",
      autoClose: 3000,
    });
    setformdata({
      name: "",
      email: "",
      Phonenumber: "",
      textarea: "",
    });
  }

  useEffect(() => {
    if (save.length > 0) {
      localStorage.setItem("save", JSON.stringify(save));
    }
  }, [save]);

  return (
    <div className="min-h-screen bg-gradient-to-br mt-12 from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <ToastContainer />
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full bg-white shadow-lg rounded-xl p-8">
        
       
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.241553841478!2d75.78974481125746!3d26.864065576578838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3f27d3dad07%3A0xb2641415d32e0c18!2sFull%20Stack%20Learning!5e0!3m2!1sen!2sin!4v1748846291965!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="h-96 w-full border-2 border-black rounded-lg"
            loading="lazy"
          ></iframe>
        </div>

     
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                value={formdata.name}
                onChange={handel}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                value={formdata.email}
                onChange={handel}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="Phonenumber"
                id="phonenumber"
                placeholder="Enter Your Number"
                value={formdata.Phonenumber}
                onChange={handel}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="textarea" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="textarea"
                id="textarea"
                placeholder="Enter Your Message"
                value={formdata.textarea}
                onChange={handel}
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
