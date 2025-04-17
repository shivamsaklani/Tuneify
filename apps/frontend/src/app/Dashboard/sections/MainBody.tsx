import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Header } from "./Header";
import { MusicSection } from "./MusicSection";
import { Sidebar } from "./Sidebar";

export const MainBody = () => {
  return (
    <div className="bg-primary h-screen flex flex-col">
      <Header />
      <ResizablePanelGroup direction="horizontal" className="flex-grow gap-2 p-5 pb-20">
        <ResizablePanel defaultSize={30} className="sm:flex hidden" minSize={20} maxSize={40} >
          <Sidebar />
        
        </ResizablePanel>
        <ResizableHandle className="sm:flex hidden"/>
        <ResizablePanel defaultSize={70}>
          <MusicSection />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
