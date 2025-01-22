import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function FeatureSection() {
  const data = [
    {
      title: "Create Workspaces",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Organize your projects efficiently with dedicated workspaces. Invite team members, manage permissions, and keep your video content structured.
          </p>
          <div className="flex justify-center">
            <Image
              src="/opal-workspace.png"
              alt="Opal workspace interface"
              width={800}
              height={450}
              className="rounded-lg object-cover w-full max-w-2xl h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Record & Upload Videos",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Easily record videos directly in your browser or use our desktop app for more advanced recording options.
          </p>
          <div className="flex justify-center">
            <Image
              src="/recording-interface.png"
              alt="Opal video recording interface"
              width={800}
              height={450}
              className="rounded-lg object-cover w-full max-w-2xl h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Organize & Share",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Create folders, tag videos, and use our powerful search feature to keep your content organized. Share videos securely with customizable privacy settings and expiration dates.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/folder-organise.png"
              alt="Opal video organization interface"
              width={600}
              height={338}
              className="rounded-lg object-cover w-full h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/ai-features.png"
              alt="Opal video sharing options"
              width={600}
              height={338}
              className="rounded-lg object-cover w-full h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Collaborate & Feedback",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Invite team members or clients to view and comment on your videos. Use time-stamped comments for precise feedback and track viewer engagement.
          </p>
          <div className="flex justify-center">
            <Image
              src="/invite-user.png"
              alt="Opal collaboration features"
              width={800}
              height={450}
              className="rounded-lg object-cover w-full max-w-2xl h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "AI-Powered Features",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Leverage AI technology for automatic video transcription, smart video titles and descriptions, and content summarization. Save time and enhance your video content effortlessly.
          </p>
          <div className="flex justify-center">
            <Image
              src="/ai-features.png"
              alt="Opal AI-powered features"
              width={800}
              height={450}
              className="rounded-lg object-cover w-full max-w-2xl h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full" id="features">
      <Timeline data={data} />
    </div>
  );
}