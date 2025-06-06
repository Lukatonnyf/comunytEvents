import AsideCard from "./components/asideCard";
import HomePage from "./components/homePage";


export default function Home() {
  return (
    <div className="w-full min-h-screen h-full overflow-y-hidden bg-bg-primary flex flex-col">

      <div className="flex flex-1 overflow-hidden min-h-0">
        <AsideCard className="flex-none w-[16rem]" />
        <HomePage className="flex-1 overflow-y-auto min-h-0" />
      </div>
    </div>

  );
}
