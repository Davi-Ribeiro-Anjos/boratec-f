import DetailIcon from '@rsuite/icons/Detail';


import { memo, useState } from "react";


import { MainComponent } from "../Global/Component";
import { ConsultJustification } from ".";


interface ConsultJustificationHeaderProps { }


export const ConsultJustificationHeader = memo(function ConsultJustificationHeader({ }: ConsultJustificationHeaderProps) {

    const [openCSV, setOpenCSV] = useState(false)


    return (
        <div>
            <MainComponent.ButtonHeader name="Gerar CSV" func={() => setOpenCSV(true)} icon={<DetailIcon />} color="blue" />
            <ConsultJustification.CSV open={openCSV} setOpen={setOpenCSV} />
        </div>
    )
})