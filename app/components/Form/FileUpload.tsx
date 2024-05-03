import { Box, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const FileUpload = ({ label }: { label: string }) => {

  const [result, setResult] = useState('')
  return (
    <Box className="h-full mb-6 mx-4">
      <FormControl>
        <FormLabel
          className="ps-2 text-base-content text-2xl"
          style={{ fontSize: "18px" }}
        >
          {label}
        </FormLabel>

        <CldUploadWidget uploadPreset="pqhkzhqu"
        onOpen={({result,})}
        
        >
          {({ open }) => {
            return (
            
            <div className=" flex">
              <Button  onClick={() => open()}>upload</Button >
              <p className="text-slate-400"> No file chosen</p>
            </div>)
          }}
        </CldUploadWidget>
      </FormControl>
    </Box>
  );
};

export default FileUpload;
