import { Doctor } from "@/API";
import { DefaultApi } from "@/API/apis/DefaultApi";
import { useEffect, useState } from "react";

const api = new DefaultApi();

export const FormContent = ({
  doctor,
  onUpdate,
}: {
  doctor?: Doctor;
  onUpdate?: (editedDoctor: Doctor) => void;
}) => {
  const [buttonText, setButtonText] = useState("Submit");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState({
    name: doctor?.name || "",
    phone: doctor?.phone || "",
    email: doctor?.email || "",
    id: doctor?.id,
    street: doctor?.street || "",
    city: doctor?.city || "",
    zip: doctor?.zip || "",
    state: doctor?.state || "",
  });

  useEffect(() => {
    const changesDetected =
      Object.entries(formData).some(
        ([key, value]) => value !== (doctor?.[key as keyof Doctor] || ""),
      ) ||
      Object.entries(doctor || {}).some(
        ([key, value]) => value !== (formData[key as keyof Doctor] || ""),
      );

    setUnsavedChanges(changesDetected);
  }, [formData, doctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (doctor) {
      try {
        const updatedDoctor: Doctor = { ...doctor, ...formData };

        onUpdate?.(updatedDoctor);
        const response = await api.apiDoctorsIdPut(
          {
            id: doctor?.id as number,
            doctor: formData,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          },
        );
        setButtonText("Submitted");

        console.log("Doctor updated successfully:", response);
      } catch (error) {
        console.error("Error updating doctor:", error);
      }
    } else {
      try {
        const response = await api.apiDoctorsPost(
          {
            doctor: formData,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          },
        );
        setButtonText("Submitted");

        console.log("Doctor added successfully:", response);
      } catch (error) {
        console.error("Error adding doctor:", error);
      }
    }
    setTimeout(() => {
      setButtonText("Submit");
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col max-w-[300px] gap-2">
        <label htmlFor="name">Name</label>
        <input
          className="bg-transparent border border-black rounded-sm pl-1"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col max-w-[300px] gap-2">
        <label htmlFor="phone">Phone</label>
        <input
          className="bg-transparent border border-black rounded-sm pl-1"
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col max-w-[300px] gap-2">
        <label htmlFor="email">Email</label>
        <input
          className="bg-transparent border border-black rounded-sm pl-1"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col max-w-[300px] gap-2">
        <label htmlFor="street">Street</label>
        <input
          className="bg-transparent border border-black rounded-sm pl-1"
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col max-w-[300px] gap-2">
        <label htmlFor="state">State</label>
        <input
          className="bg-transparent border border-black rounded-sm pl-1"
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col max-w-[300px] gap-2">
        <label htmlFor="zip">Zip</label>
        <input
          className="bg-transparent border border-black rounded-sm pl-1 "
          type="text"
          id="zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-center my-5">
        <button
          disabled={buttonText === "Submitted" || !unsavedChanges}
          className="px-2 py-1 w-auto h-auto text-white hover:bg-[#22B3A7] bg-[#344597] hover:text-white rounded-md disabled:bg-gray-200 disabled:text-white"
          type="submit"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};
