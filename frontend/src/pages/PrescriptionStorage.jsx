import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PrescriptionUpload = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [formData, setFormData] = useState({ hospital: "", doctor: "", date: "" });
  const [showDialog, setShowDialog] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/prescriptions").then((res) => {
      setPrescriptions(res.data);
    });
  }, []);

  const handleImageUpload = (files) => {
    setSelectedImageFile(files[0]);
    setShowDialog(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageUpload(e.dataTransfer.files);
  };

  const handleSubmitData = async () => {
    if (!formData.hospital || !formData.doctor || !formData.date || !selectedImageFile) return;

    const data = new FormData();
    data.append("image", selectedImageFile);
    data.append("hospital", formData.hospital);
    data.append("doctor", formData.doctor);
    data.append("date", formData.date);

    const res = await axios.post("http://localhost:5000/api/upload", data);
    setPrescriptions((prev) => [...prev, res.data]);
    setFormData({ hospital: "", doctor: "", date: "" });
    setSelectedImageFile(null);
    setShowDialog(false);
  };

  const handleRemove = async (filename) => {
    await axios.delete(`http://localhost:5000/api/delete/${filename}`);
    setPrescriptions((prev) => prev.filter((p) => p.image !== filename));
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 px-6 py-10 font-sans">
      <div className="absolute top-6 right-6">
        <a href="/" title="Go Home">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400 hover:text-yellow-300 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </a>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center uppercase tracking-wide">📋 Upload Medical Prescriptions</h2>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
        className="border-4 border-dashed border-yellow-500 bg-black rounded-lg p-8 text-center cursor-pointer mb-10 hover:bg-yellow-900/20 transition"
      >
        <p className="text-yellow-300 text-lg">📥 Click or Drag & Drop to upload prescriptions</p>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => handleImageUpload(e.target.files)}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {prescriptions.map((item, index) => (
          <div key={index} className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden relative group">
            <img src={`http://localhost:5000/uploads/${item.image}`} alt="Prescription" className="w-full h-48 object-cover" />
            <div className="p-4">
              <p><span className="font-semibold">🏥 Hospital Name:</span> {item.hospital}</p>
              <p><span className="font-semibold">👨‍⚕️ Doctor Name:</span> {item.doctor}</p>
              <p><span className="font-semibold">📅 Appointed Date:</span> {item.date}</p>
              <p className="text-sm text-yellow-300 mt-1">🕒 Uploaded at: {item.timestamp}</p>
            </div>
            <button
              onClick={() => handleRemove(item.image)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-2xl w-96 text-yellow-300 border border-yellow-600">
            <h3 className="text-xl font-bold mb-4 text-center">📝 Enter Prescription Details</h3>
            <input type="text" placeholder="Hospital Name" value={formData.hospital} onChange={(e) => setFormData({ ...formData, hospital: e.target.value })} className="w-full bg-zinc-700 text-yellow-100 p-2 rounded mb-3" />
            <input type="text" placeholder="Doctor Name" value={formData.doctor} onChange={(e) => setFormData({ ...formData, doctor: e.target.value })} className="w-full bg-zinc-700 text-yellow-100 p-2 rounded mb-3" />
            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full bg-zinc-700 text-yellow-100 p-2 rounded mb-3" />
            <div className="flex justify-between mt-5">
              <button onClick={() => { setShowDialog(false); setSelectedImageFile(null); }} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancel</button>
              <button onClick={handleSubmitData} className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionUpload;
