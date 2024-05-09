"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { BiSolidTrash } from "react-icons/bi";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { error } from "console";

interface CloudinaryResult {
  public_id: string;
  original_filename: string;
}

interface body {
  message: string;
  value: boolean;
}

interface Props {
  label: string;
  publicId: string;
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
  imageSupplied?: boolean;
  setImageSupplied?: React.Dispatch<React.SetStateAction<boolean>>;
  key: number | string
}

const FileUpload = ({ label, imageSupplied, setImageSupplied, key }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [publicId, setPublicId] = useState("");

  const [filename, setFilename] = useState("");
  const toast = useToast({
    position: "top",
    containerStyle: {
      color: "green",
    },
  });

  const handleUpload = async (myResult: CloudinaryUploadWidgetResults) => {
    if (myResult.event === "success") {
      setPublicId((myResult.info as CloudinaryResult).public_id);
      setFilename((myResult.info as CloudinaryResult).original_filename);
      setImageSupplied && setImageSupplied(true);
    }
  };

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .post<body>("http://localhost:3000/api/deleteImage", {
        publicId: publicId,
      })
      .then((response) => {
        if (response.data.value === true) {
          setPublicId("");
          setFilename("");
        } else {
          toast({ title: "could not delete image" });
        }
        setImageSupplied && setImageSupplied(false);
      })
      .catch((error) => {
        toast({ title: "internal server error" });
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box key={key} className="h-full mb-6 mx-4">
      <FormControl>
        <FormLabel
          className="ps-2 text-base-content text-2xl"
          style={{ fontSize: "18px" }}
        >
          {label}
        </FormLabel>

        <CldUploadWidget
          options={{ sources: ["local", "url", "camera"] }}
          uploadPreset="pqhkzhqu"
          onSuccess={(result) => handleUpload(result)}
          onError={(err) => console.log(err)}
          onShowCompleted={(result) => console.log(result)}
        >
          {({ open }) => {
            return (
              <div className=" flex justify-between">
                <div className="flex">
                  {!publicId && (
                    <Button className="" onClick={() => open()}>
                      upload
                    </Button>
                  )}
                  <p className=" my-auto ms-3 text-green-600">
                    {filename
                      ? filename.length > 32
                        ? filename.slice(0, 32) + "..."
                        : filename
                      : "No file chosen"}{" "}
                  </p>
                </div>
                {publicId && !isLoading && (
                  <BiSolidTrash
                    className={`text-red-600 hover:opacity-60 active:opacity-100
                   my-auto text-2xl`}
                    onClick={publicId ? handleDelete : () => {}}
                  />
                )}
                {publicId && isLoading && <Spinner color="green.500" />}
              </div>
            );
          }}
        </CldUploadWidget>
      </FormControl>
      {imageSupplied === false && (
        <p className="text-red-600">please supply image</p>
      )}
    </Box>
  );
};

export default FileUpload;
