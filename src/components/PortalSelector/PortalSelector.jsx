"use client";
import { FaUserGraduate, FaUserShield } from "react-icons/fa";

const roles = [
  { label: "Student", value: "student", icon: FaUserGraduate },
  { label: "Authority", value: "authority", icon: FaUserShield },
];

const PortalSelector = ({ setPortal }) => {
  return (
    <div className="space-y-4">
      {roles.map((role) => {
        const Icon = role.icon;
        return (
          <button
            key={role.value}
            onClick={() => setPortal(role.value)}
            className={`w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center cursor-pointer`}
          >
            <Icon className="mr-3" /> {role.label}
          </button>
        );
      })}
    </div>
  );
};

export default PortalSelector;
