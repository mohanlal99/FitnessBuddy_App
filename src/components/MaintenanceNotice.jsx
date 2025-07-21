"use client";

import { useEffect } from "react";
import { Wrench } from "lucide-react";
import Modal from "./ui/Modal";
import useModal from "../hooks/useMoadal";

export default function MaintenanceNotice() {
  const [isOpen, onOpen, onOpenChange] = useModal(true);

  useEffect(() => {
    // Uncomment below to auto-close after 3 seconds
    const timer = setTimeout(() => onOpenChange(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <Modal
      title="Maintenance Notice"
      size="xl"
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col items-center justify-center text-center px-6 py-8">
        <Wrench size={64} className="text-yellow-500 mb-4 animate-pulse" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Page Under Maintenance
        </h1>
        <p className="text-gray-600 text-lg max-w-md">
          We’re currently performing scheduled updates. Please check back
          shortly.
        </p>
        <p className="mt-4 text-sm text-gray-500 italic">
          You can preview how this page will look once live.
        </p>
      </div>
    </Modal>
  );
}
