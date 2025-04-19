import { TrackItemType } from "@/types/GlobalTypes"


export const TrackItem=({
    id,
    href,
    img,
    name,
    Album,
    date,
    duration
}:TrackItemType)=>{
    return(
        <div className="hover:bg-primary/70 hover:rounded-sm p-3 px-2">
      <div className="flex justify-between flex-rows items-center">
        <div className="flex items-center">
        <div className="flex items-center gap-5">
            <p>{id}</p>
        <img src={img} className="size-10 rounde-md" />
        <div className="flex">{name}</div>

        </div>
        
        </div>
        <div className="flex">{Album.name}</div>
        <div className="flex">{date}</div>
        <div className="flex">{duration}</div>
      </div>
    </div>
    )
}