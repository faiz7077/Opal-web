import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

type Props = {
  title: string;
  id: string;
  source: string;
  description: string;
};

const RichLink = ({ title, id, source, description }: Props) => {
  const copyRighText = () => {
    const originalTitle = title;
    const thumbnail = `
<a style="display: flex; flex-direction: column; gap: 10px; text-decoration: none; color: inherit;" 
   href="${process.env.NEXT_PUBLIC_HOST_URL}/preview/${id}">
  <h3 style="margin: 0; font-size: 16px;">${originalTitle}</h3>
  <p style="margin: 0; font-size: 14px; color: #555;">${description}</p>
  <video
      width="320"
      style="display: block; margin-top: 8px;"
      controls
  >
      <source
          type="video/webm"
          src="https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/opal/${source}.webm"
      />
      Your browser does not support the video tag.
  </video>
</a>`;

    const thumbnailBlob = new Blob([thumbnail], { type: "text/html" });
    const blobTitle = new Blob([originalTitle], { type: "text/plain" });

    const data = [
      new ClipboardItem({
        ["text/plain"]: blobTitle,
        ["text/html"]: thumbnailBlob,
      }),
    ];
    navigator.clipboard.write(data).then(() => {
      return toast("Embedded Link Copied", {
        description: "Successfully copied embedded link",
      });
    });
  };

  return (
    <Button onClick={copyRighText} className="rounded-full" variant={"secondary"}>
      Get Embedded Code
    </Button>
  );
};

export default RichLink;
