import PlusIcon from '@rsuite/icons/Plus';

import { useState, memo, useContext } from "react";

import { MainComponent } from "../../Global/Component";
import { Manual } from '.';
import { UserContext } from '../../../providers/UserProviders';

interface ManualHeaderProps { }


export const ManualHeader = memo(
    function ManualHeader({ }: ManualHeaderProps) {
        const { verifyPermissionPage }: any = useContext(UserContext)
        const [open, setOpen] = useState(false);


        return (
            <>
                {verifyPermissionPage("manual") && (
                    <>
                        <MainComponent.ButtonHeader name="Adicionar Manual" func={() => setOpen(true)} color="green" icon={<PlusIcon />} />
                        <Manual.Create open={open} setOpen={setOpen} />
                    </>
                )}
            </>
        )
    })