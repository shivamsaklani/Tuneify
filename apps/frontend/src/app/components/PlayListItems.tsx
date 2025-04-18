import { ElementType } from "react";

type PlayListItemsProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  icon?: ElementType;
  selected?: boolean;
};

export const PlayListItems = ({
  children,
  icon,
  className,
  title,
  selected,
}: PlayListItemsProps) => {
  const Icon = icon;

  return (
    <div className="flex shadow-md shadow-white h-full flex-col p-3 gap-5">
      <div className="flex text-gray-200 sticky justify-center items-center gap-2">
        {Icon && (
          <span >
            <Icon />
          </span>
        )}
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
      </div>
      
        {children}
    </div>
  );
};
