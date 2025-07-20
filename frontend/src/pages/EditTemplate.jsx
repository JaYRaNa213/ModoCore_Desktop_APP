// src/pages/EditTemplate.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getTemplateById, updateTemplate } from "../services/TemplateService";
import AddTemplate from "./AddTemplate";
import { LoaderCircle, ArrowLeft } from "lucide-react";


export default function EditTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getTemplateById(id)
      .then((data) => {
        setTemplate(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
        toast.error("Template not found.");
      });
  }, [id]);

  const handleUpdate = async (updated) => {
    try {
      await updateTemplate(id, updated);
      toast.success("Template updated!");
      navigate("/templates");
    } catch (err) {
      toast.error("Failed to update template");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-indigo-600 animate-spin">
        <LoaderCircle className="w-6 h-6" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">🚫 Template not found.</p>
        <button
          onClick={() => navigate("/templates")}
          className="mt-4 inline-flex items-center text-indigo-600 hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Templates
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">✏️ Edit Template</h2>
        <button
          onClick={() => navigate("/templates")}
          className="text-sm text-indigo-600 hover:underline inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <AddTemplate initialData={template} onSubmit={handleUpdate} mode="edit" />
    </div>
  );
}
