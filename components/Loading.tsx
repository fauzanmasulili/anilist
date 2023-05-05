import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
        loading...
      </div>
    </div>
  );
}
