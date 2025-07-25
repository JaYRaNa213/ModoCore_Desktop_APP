// src/pages/EditTemplate.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getTemplateById, updateTemplate } from "../services/TemplateService";
import AddTemplate from "./AddTemplate";
import {
  LoaderCircle,
  ArrowLeft,
  Edit3,
  AlertTriangle,
  Sparkles,
  Clock,
  Target,
  Zap
} from "lucide-react";

export default function EditTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      toast.error("Invalid template ID");
      return;
    }

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
      toast.success("Template updated successfully!");
      navigate("/templates");
    } catch (err) {
      toast.error("Failed to update template");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <LoaderCircle className="w-8 h-8 animate-spin text-purple-400" />
        <span className="ml-3 text-lg">Loading template...</span>
      </div>
    );
  }

  if (notFound || !template) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl border border-red-500 text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="text-red-500 w-8 h-8" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Template Not Found</h2>
          <p className="text-gray-400 mb-4">It seems this template doesn't exist or has been deleted.</p>
          <button
            onClick={() => navigate("/templates")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="sticky top-0 z-20 bg-black/50 backdrop-blur-md border-b border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/templates")}
              className="w-10 h-10 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl flex items-center justify-center transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-300" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">Edit Template</h1>
              <p className="text-sm text-gray-400">Modify your workspace template settings</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-800">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white">{template.title}</span>
              </div>
              <div className="w-px h-4 bg-gray-700" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">Last modified</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-yellow-800/20 px-4 py-2 border border-yellow-600/40 rounded-xl">
              <Edit3 className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300 font-medium">Edit Mode</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-purple-700/10 to-indigo-700/10 border border-purple-600/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">You're editing:</h3>
              <p className="text-purple-200 text-sm">
                <strong>"{template.title}"</strong> — Make your changes below and click save. All updates will reflect immediately.
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm text-purple-300">
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Template ID: {template._id}
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Used: {template.usageCount || 0} times
                </span>
              </div>
            </div>
          </div>
        </div>

        <AddTemplate
          initialData={template}
          onSubmit={handleUpdate}
          mode="edit"
        />
      </div>
    </div>
  );
}
