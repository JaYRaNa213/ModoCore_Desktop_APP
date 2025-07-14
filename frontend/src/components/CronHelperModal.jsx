// src/components/CronHelperModal.jsx
import React from "react";
import { Dialog } from "@/components/ui/Modal";

const CronHelperModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} title="CRON Expression Helper">
      <div className="space-y-3 text-sm">
        <p>
          A CRON expression is a string used to schedule tasks. Format:
          <code className="bg-gray-100 px-2 py-1 rounded ml-2">
            * * * * *
          </code>
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Minute</strong>: 0–59</li>
          <li><strong>Hour</strong>: 0–23</li>
          <li><strong>Day of Month</strong>: 1–31</li>
          <li><strong>Month</strong>: 1–12</li>
          <li><strong>Day of Week</strong>: 0 (Sun)–6 (Sat)</li>
        </ul>
        <p>
          Examples:
          <br />
          <code className="bg-gray-100 px-2 py-1 rounded">0 9 * * *</code>
          – Every day at 9AM
          <br />
          <code className="bg-gray-100 px-2 py-1 rounded">*/15 * * * *</code>
          – Every 15 minutes
        </p>
      </div>
    </Dialog>
  );
};

export default CronHelperModal;
