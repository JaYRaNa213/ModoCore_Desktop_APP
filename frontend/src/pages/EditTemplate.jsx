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
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <LoaderCircle className="w-8 h-8 text-white animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Loading Template</h3>
            <p className="text-gray-400">Please wait while we fetch your template...</p>
          </div>
        </div>

        <style jsx>{`
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-12 text-center max-w-md">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 opacity-70">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Template Not Found</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              The template you're looking for doesn't exist or may have been deleted.
            </p>
            <button
              onClick={() => navigate("/templates")}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Templates
            </button>
          </div>
        </div>

        <style jsx>{`
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <div className="bg-black/50 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/templates")}
                  className="flex items-center justify-center w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl transition-all duration-300 group"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                    Edit Template
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Modify your workspace template settings
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {template && (
                  <div className="hidden md:flex items-center gap-4 bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300 font-medium">{template.title}</span>
                    </div>
                    <div className="w-px h-4 bg-gray-700"></div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">Last modified</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-amber-600/20 backdrop-blur-xl border border-amber-500/30 px-4 py-2 rounded-xl">
                  <Edit3 className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-amber-300 font-medium">Edit Mode Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Editing Template</h3>
                <p className="text-purple-200 text-sm leading-relaxed mb-4">
                  You're now editing <strong>"{template?.title}"</strong>. Make your changes below and save when you're ready. 
                  All modifications will be applied immediately after saving.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Target className="w-4 h-4" />
                    <span>Template ID: {id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Zap className="w-4 h-4" />
                    <span>Usage: {template?.usageCount || 0} times</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AddTemplate initialData={template} onSubmit={handleUpdate} mode="edit" />
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}