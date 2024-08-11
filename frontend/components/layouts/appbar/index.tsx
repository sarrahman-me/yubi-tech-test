import { IoMdNotificationsOutline } from "react-icons/io";

export default function AppBar({ title }: { title: string }) {
  return (
    <div className="w-full flex justify-between items-center border-b pb-1 md:pb-0">
      <p className="text-secondary-medium/80 font-semibold text-lg">{title}</p>
      <span>
        <IoMdNotificationsOutline className="text-xl text-secondary-medium" />
      </span>
    </div>
  );
}
