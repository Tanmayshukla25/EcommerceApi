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
    <div className="min-h-screen  bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800 flex items-center justify-center px-4 py-12">
      <ToastContainer />

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full bg-white/90 shadow-2xl rounded-2xl p-0 overflow-hidden">
        
        <div className="bg-gradient-to-bl from-blue-50 via-pink-100 to-yellow-50 flex items-center justify-center">
          <div className="p-2 w-full h-full rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.241553841478!2d75.78974481125746!3d26.864065576578838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3f27d3dad07%3A0xb2641415d32e0c18!2sFull%20Stack%20Learning!5e0!3m2!1sen!2sin!4v1748846291965!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="h-96 w-full border-4 border-gradient-to-br from-yellow-400 to-pink-400 rounded-2xl shadow-xl"
              loading="lazy"
              style={{ minHeight: "24rem" }}
            ></iframe>
          </div>
        </div>

 
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl px-8 py-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                value={formdata.name}
                onChange={handel}
                required
                className="w-full px-5 py-3 border-[1.5px] border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-pink-400 outline-none bg-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                value={formdata.email}
                onChange={handel}
                required
                className="w-full px-5 py-3 border-[1.5px] border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-pink-400 outline-none bg-white"
              />
            </div>

            <div>
              <label htmlFor="phonenumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="Phonenumber"
                id="phonenumber"
                placeholder="Enter Your Number"
                value={formdata.Phonenumber}
                onChange={handel}
                required
                className="w-full px-5 py-3 border-[1.5px] border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-pink-400 outline-none bg-white"
              />
            </div>

            <div>
              <label htmlFor="textarea" className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="textarea"
                id="textarea"
                placeholder="Enter Your Message"
                value={formdata.textarea}
                onChange={handel}
                rows={4}
                required
                className="w-full px-5 py-3 border-[1.5px] border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-pink-400 outline-none bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 hover:from-yellow-500 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-bold text-lg shadow-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300"
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
