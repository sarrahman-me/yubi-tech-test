"use client";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function AppBar({
  title,
  buttonBack,
}: {
  title: string;
  buttonBack?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="w-full flex justify-between items-center border-b mb-1">
      {buttonBack ? (
        <span>
          <MdArrowBack
            onClick={() => router.back()}
            className="text-xl text-secondary-medium/80 cursor-pointer hover:text-primary-600"
          />
        </span>
      ) : null}
      <p className="text-secondary-medium/80 font-semibold text-lg">{title}</p>
      <span>
        <IoMdNotificationsOutline className="text-xl text-secondary-medium/80" />
      </span>
    </div>
  );
}
