import { Skeleton } from "@/components/ui/skeleton";
import { Timer } from "lucide-react";
import { TrackItem } from "@/app/components/TrackItem";
import { TrackItemType } from "@/types/GlobalTypes";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlaylistSectionProps {
  playlistId: string;
  playlistName: string;
  playlistImage: string | null;
  userName: string;
  trackData: TrackItemType[] | null;
}

export const PlaylistSection = ({
  playlistName,
  playlistImage,
  userName,
  trackData,
}: PlaylistSectionProps) => {

  return (
    <div className="grid h-full w-full">
      <section className="h-full pb-5 text-white bg-black/40 rounded-md overflow-auto flex flex-col">
        <ScrollArea className="w-full h-full overflow-auto">
          <div className="bg-gradient-to-br from-purple-500 shadow-md shadow-gray-950 to-blue-500 pt-10 px-3 pb-3 w-full">
            <div className="flex px-3 gap-10">
              <div className="flex">
                {playlistImage ? (
                  <img
                    src={playlistImage}
                    className="sm:size-40 size-32 shadow-lg shadow-gray-950 rounded-md"
                    alt="Profile"
                  />
                ) : (
                  <Skeleton className="size-40 shadow-lg shadow-gray-950 rounded-md"></Skeleton>
                )}
              </div>
              <div className="flex items-start justify-center flex-col">
                <div className="flex">
                  <span>Playlist</span>
                </div>
                <h1 className="text-4xl font-white font-sans">{playlistName}</h1>
                <div className="flex flex-rows item-center justify-center">
                  <p>{userName}</p>
                  <p className="text-lg px-2">-</p>
                  <p>{trackData?.length} Songs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Animated Title
          <motion.div
         
            className="sticky top-0 absolute z-999 bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-2 shadow-md"
          >
            <h1 className="text-4xl font-white font-sans">Music PlayList</h1>
          </motion.div> */}

          {/* List of music tracks */}
          <div className="px-5">
            <div className="flex pb-5 pt-5 justify-between items-center gap-4 overflow-hidden text-gray-400 text-sm">
              <div className="flex gap-5 overflow-hidden flex-1 min-w-0">
                <div className="w-5 shrink-0">#</div>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
                  Title
                </div>
              </div>

              <div className="overflow-hidden text-ellipsis whitespace-nowrap w-40">
                Album
              </div>

              <div className="overflow-hidden md:flex hidden text-ellipsis whitespace-nowrap w-28">
                Date
              </div>

              <div className="w-14 px-5 text-right">
                <Timer />
              </div>
            </div>

            <div>
              {trackData ? (
                trackData.map((item, idx) => (
                  <div key={idx}>
                    <TrackItem
                      index={idx}
                      id={item.id}
                      name={item.name}
                      Album={item.Album}
                      date={item.date}
                      duration={item.duration}
                      img={item.img}
                      href={item.href}
                    />
                  </div>
                ))
              ) : (
                <Skeleton count={5} className="h-8 w-full flex gap-2"></Skeleton>
              )}
            </div>
          </div>
        </ScrollArea>
      </section>
    </div>
  );
};
