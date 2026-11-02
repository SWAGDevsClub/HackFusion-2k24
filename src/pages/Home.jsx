import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Info from "../components/Info";
import PrevWinners from "../components/PrevWinners";
import Footer from "../components/Footer";
import CherryBlossom from "../components/Cherryblossom"
import PrizePool from "../components/PrizePool";
import BookSection from "../components/BookSection";
import Schedule from "../components/Schedule";
export default function Home() {
    return (
        <div className="overflow-x-clip">
            <Navbar />
            <CherryBlossom>
                <HeroSection />
            </CherryBlossom>
            <Info />
            <BookSection />
            <PrizePool/>
            <Schedule/>           
            <PrevWinners />
            <Footer />
        </div>
    );
}