import DetailIcon from '@rsuite/icons/Detail';

import { memo, useState } from "react";

import { MainComponent } from "../../Global/Component";
import { StatusDelivery } from ".";


interface StatusDeliveryHeaderProps { }


export const StatusDeliveryHeader = memo(function StatusDeliveryHeader({ }: StatusDeliveryHeaderProps) {

    const [openCSV, setOpenCSV] = useState(false)


    return (
        <div>
            <MainComponent.ButtonHeader name="Gerar CSV" func={() => setOpenCSV(true)} icon={<DetailIcon />} color="blue" />
            <StatusDelivery.CSV open={openCSV} setOpen={setOpenCSV} />
        </div>
    )
})