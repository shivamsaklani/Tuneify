import { TrackItemType } from "@/types/GlobalTypes";
import { PlayMusic } from "../PlayLogic/PlayMusic";

function convertDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

interface TrackItemProps extends TrackItemType {
  index: number;
}

export const TrackItem = ({
  id,
  href,
  img,
  name,
  Album,
  index,
  date,
  duration,
}: TrackItemProps) => {
  return (
    <div onClick={()=>PlayMusic(id)} className="hover:bg-primary/70 text-gray-300 cursor-pointer hover:rounded-sm p-3 px-2">
      <div className="flex justify-between items-center gap-4 overflow-hidden">
        <div className="flex items-center gap-5 overflow-hidden flex-1 min-w-0">
          <p className="w-5 shrink-0">{index + 1}</p>
          <img src={img} className="size-10 rounded-md shrink-0" />
          <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            {name}
          </div>
        </div>

        <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap w-40">
          {Album.name}
        </div>

        <p className="text-sm md:flex hidden overflow-hidden text-ellipsis whitespace-nowrap w-28">
          {date}
        </p>

        <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap w-14 text-right">
          {convertDuration(duration)}
        </div>
      </div>
    </div>
  );
};
