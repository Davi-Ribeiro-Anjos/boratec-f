import MinusIcon from '@rsuite/icons/Minus';

import { useState, memo, useContext } from "react";
import { UserContext } from "../../../providers/UserProviders";

import { RegistrationForm } from ".";
import { MainComponent } from "../../Global/Component";


interface RegistrationHeaderProps { }


export const RegistrationHeader = memo(function RegistrationHeader({ }: RegistrationHeaderProps) {
    const { verifyPermission }: any = useContext(UserContext)

    const [open, setOpen] = useState(false)
    const demissionModal = () => {
        setOpen(true)
    }

    return (
        <div>
            {verifyPermission("employee_admin") && (
                <MainComponent.ButtonHeader name="Checar Demissão" func={demissionModal} icon={<MinusIcon />} color="red" />
            )}
            <RegistrationForm.Dismissal open={open} setOpen={setOpen} />
        </div>
    )
})