import { TrackItemType } from "@/types/GlobalTypes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { convertDuration } from "../PlayLogic/Duration";
import { usePlayMusic } from "../PlayLogic/PlayMusic";
import MusicBars from "./Musicbar";

interface TrackItemProps extends TrackItemType {
  index: number;
}

export const TrackItem = ({
  id,
  img,
  name,
  Album,
  index,
  date,
  duration,
}: TrackItemProps) => {
  const {PlayMusic}=usePlayMusic();
  const curId = useSelector((state:RootState)=>state.Track.id);
  return (
    <>
    <div onClick={()=>PlayMusic(id)} className={`${curId == id && "bg-primary/70 rounded-sm"} hover:bg-primary/70 text-gray-300 cursor-pointer hover:rounded-sm p-3 px-2`}>
      <div className="flex justify-between items-center gap-4 overflow-hidden">
        <div className="flex items-center gap-5 overflow-hidden flex-1 min-w-0">
          {curId == id ?<MusicBars className="h-5" isPlaying/>: <p className="w-5 shrink-0">{index + 1}</p>}
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
    </>
  );
};
