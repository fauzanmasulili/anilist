import React, { ReactNode } from "react";
import Image from "next/image";

type cardProps = {
  children?: ReactNode;
  leftBanner: boolean;
  imageSrc: string;
};

export default function Card({ children, leftBanner, imageSrc }: cardProps) {
  return (
    <>
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {leftBanner && (
          <Image
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={imageSrc}
            alt=""
            width="100"
            height="100"
          />
        )}
        <div className="flex flex-col justify-between p-4 leading-normal">
          {children}
        </div>
      </a>
    </>
  );
}
