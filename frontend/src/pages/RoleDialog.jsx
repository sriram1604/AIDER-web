import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleDialog = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  const correctPasskey = 'doctor123'; // or use env: import.meta.env.VITE_DOCTOR_PASSKEY

  const handleDoctorClick = () => {
    setStep(2); // move to passkey input step
  };

  const handleCheckPasskey = () => {
    if (passkey === correctPasskey) {
      setOpen(false);
      navigate('/');
    } else {
      setError('❌ Incorrect passkey. Try again.');
      setTimeout(() => {
        setOpen(false);
        navigate('/login');
      }, 1000);
    }
  };

  const handlePatientClick = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover z-0">
          <source src="/videos/back.mp4" type="video/mp4" />
        </video>

      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-10 z-10"></div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm opacity-60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">
          {step === 1 ? (
            <>
              <Dialog.Title className="text-2xl font-bold mb-4 text-center">
                Choose Your Role
              </Dialog.Title>
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleDoctorClick}
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  👨‍⚕️ Doctor
                </button>
                <button
                  onClick={handlePatientClick}
                  className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  🧑‍💼 Patient
                </button>
              </div>
            </>
          ) : (
            <>
              <Dialog.Title className="text-xl font-semibold mb-3 text-center">
                Enter Doctor Passkey
              </Dialog.Title>
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="🔒 Passkey"
                className="w-full p-2 border rounded-lg mb-3"
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-500 hover:underline"
                >
                  ⬅ Back
                </button>
                <button
                  onClick={handleCheckPasskey}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    </>
    
  );
};

export default RoleDialog;
