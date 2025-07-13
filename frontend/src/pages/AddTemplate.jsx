// src/pages/AddTemplate.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Textarea";
import { Card, CardContent, CardHeader, CardFooter } from "../components/ui/Card";


export default function AddTemplate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [apps, setApps] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTemplate = {
      id: Date.now(),
      title,
      description,
      apps: apps.split(",").map((a) => a.trim()),
    };
    console.log("Created Template:", newTemplate);
    // TODO: Send to backend or update global state
    navigate("/templates");
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card className="p-6">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Create New Template</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Input
              placeholder="Apps (comma separated)"
              value={apps}
              onChange={(e) => setApps(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">Create Template</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
