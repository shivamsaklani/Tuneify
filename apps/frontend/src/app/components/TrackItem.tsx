import { TrackItemType } from "@/types/GlobalTypes"


export const TrackItem=({
    onclick,
    idx,
    img,
    title,
    Album,
    duration
}:TrackItemType)=>{
    return(
        <div className="hover:bg-primary/70 hover:rounded-sm p-3 px-2" onClick={onclick}>
      <div className="flex justify-between flex-rows items-center">
        <div className="flex items-center">
        <div className="flex items-center gap-5">
            <p>{idx}</p>
        <img src={img} className="size-10 rounde-md" />
        <div className="flex" onClick={onclick}>{title}</div>

        </div>
        
        </div>
        <div className="flex">{Album}</div>
        <div className="flex">{duration}</div>
      </div>
    </div>
    )
}