export interface Images{
  url: string;
  height:number;
  width:number;
}
export interface SelectedPlaylist{
  id:string;
  name:string;
}

export interface PlaylistItem {
    id: string;
    name: string;
    images: Images[];
    // Add more properties as needed
  }
export interface Album{
  id:string;
  name:string;
}
export interface TrackItemType{
  id:string;
  href:string;
  img:string;
  name:string;
  Album:Album;
  date:string;
  duration:number;
}

export interface TrackType{
  id:string,
  img:string,
  duration:number,
  name:string,
}