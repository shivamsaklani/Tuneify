type ItemsProps = {
  src?: string;
  title?: string;
  id:string;
  onclick: (name: string | undefined ,id:string |undefined) => void;
  selected:boolean;

};

export const Items = ({ src, title,onclick,id }: ItemsProps) => {

  return (
    <div onClick={()=>onclick(title,id)} className={`flex items-center gap-3 text-white hover:bg-primary/80 rounded-sm py-3 cursor-pointer px-3`}>
      {src && (
        <img
          src={src}
          alt={title || "Image"}
          width={40}
          height={40}
          className="rounded-md"
        />
      )}
      <h2>{title}</h2>
            
    </div>
  );
};
