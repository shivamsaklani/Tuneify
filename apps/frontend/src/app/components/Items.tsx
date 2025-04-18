import Image, { StaticImageData } from "next/image";

type ItemsProps = {
  src?: string;
  title?: string;
};

export const Items = ({ src, title }: ItemsProps) => {
  return (
    <div className="flex items-center gap-3">
      {src && (
        <img
          src={src}
          alt={title || "Image"}
          width={40}
          height={40}
          className="rounded-md"
        />
      )}
      <h1 className="text-white text-base">{title}</h1>
    </div>
  );
};
