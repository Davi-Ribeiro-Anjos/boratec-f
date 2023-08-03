import { BranchConfirmTransfer } from "./BranchConfirmTransfer";
import { BranchCreatePallet } from "./BranchCreatePallet";
import { BranchCreateTransfer } from "./BranchCreateTransfer";
import { BranchFilter } from "./BranchFilter";
import { BranchHeader } from "./BranchHeader";
import { BranchInfo } from "./BranchInfo";



export const PalletBranch = {
    Header: BranchHeader,
    Filter: BranchFilter,
    CreateTransfer: BranchCreateTransfer,
    Info: BranchInfo,
    CreatePallet: BranchCreatePallet,
    ConfirmTransfer: BranchConfirmTransfer
}