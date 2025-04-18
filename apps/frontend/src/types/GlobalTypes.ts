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
 