import { ElementType } from "react";

type GroupItemsProps = {
  children?: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  title?: string;
  icon?: ElementType;
};

export const GroupItems = ({
  children,
  icon,
  className,
  title,
  scrollable = false,
}: GroupItemsProps) => {
  const Icon = icon;

  return (
    <div className="flex shadow-md shadow-white h-full flex-col p-3 gap-5">
      <div className="flex text-gray-200 justify-center items-center gap-2">
        {Icon && (
          <span >
            <Icon />
          </span>
        )}
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
      </div>
      <div
        className={` shrink text-gray-300 ${className} ${
          scrollable ? "overflow-auto max-h-120 " : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};
