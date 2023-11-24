import DetailIcon from '@rsuite/icons/Detail';

import { memo, useState } from "react";

import { MainComponent } from "../Global/Component";
import { Performance } from ".";


interface PerformanceHeaderProps { }


export const PerformanceHeader = memo(function PerformanceHeader({ }: PerformanceHeaderProps) {

    const [openCSV, setOpenCSV] = useState(false)


    return (
        <div>
            <MainComponent.ButtonHeader name="Gerar CSV" func={() => setOpenCSV(true)} icon={<DetailIcon />} color="blue" />
            <Performance.CSV open={openCSV} setOpen={setOpenCSV} />
        </div>
    )
})