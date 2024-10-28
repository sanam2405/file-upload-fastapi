"use client";

import { FileUpload, Input } from "@/components";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import axios from "axios";
import { BASE_API_URI } from "@/constants";

export default function FileUploadPage() {
  const [name, setName] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name) {
      toast({
        title: "No username is provided",
        description: "Select a username and a file before submitting",
        variant: "destructive",
      });
    } else if (files.length == 0) {
      toast({
        title: "No file is provided",
        description: "Select a username and a file before submitting",
        variant: "destructive",
      });
    } else if (!name && files.length == 0) {
      toast({
        title: "No username and file is provided",
        description: "Select a username and a file before submitting",
        variant: "destructive",
      });
    } else {
      try {
        const formData = new FormData();
        formData.append("username", name);
        files.forEach((file) => {
          formData.append("file", file);
        });

        console.log(formData);

        const response = await axios.post(
          `${BASE_API_URI}/file-upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        console.log("Response:", response.data);
        if (response.status == 200) {
          toast({
            title: "File Uploaded Successfully",
            description: `${files[0].name} has been uploaded successfully`,
          });
        }
      } catch (error) {
        console.error("Error uploading data:", error);
        toast({
          title: "Error in uploading the file",
          description: `${files[0].name} could not be uploaded`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <div className="">
        <Input handleChange={handleChange} />
        <FileUpload onChange={handleFileUpload} />
        <div className="flex justify-center items-center">
          <button
            className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
