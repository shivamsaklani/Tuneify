import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Header } from "./Header";
import { MusicSection } from "./MusicSection";
import { Sidebar } from "./Sidebar";
import { MusicPlayer } from "./MusicPlayer";

export const MainBody = () => {
  return (
    <div className="bg-primary h-screen flex flex-col">
      <Header />
      <ResizablePanelGroup direction="horizontal" className="flex-grow gap-2 p-2 pb-5">
        <ResizablePanel defaultSize={20} className="md:flex hidden" minSize={5} maxSize={20} >
          <Sidebar />
        
        </ResizablePanel>
        <ResizableHandle className="md:flex hidden 
         rounded-full
         bg-gray-400/0 hover:bg-gray-300
        cursor-col-resize"/>
        <ResizablePanel defaultSize={70}>
          <MusicSection />
        </ResizablePanel>
      </ResizablePanelGroup>
      <MusicPlayer />
    </div>
  );
};
