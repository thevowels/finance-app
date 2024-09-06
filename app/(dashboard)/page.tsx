import DataGrid from "@/components/data-grid";
import {DataCharts} from "@/components/data-chart";


export default function Home() {


    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-19 -mt-24">
            <DataGrid/>
            <DataCharts/>
        </div>
  );
}
