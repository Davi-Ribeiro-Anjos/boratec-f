import { EpiControlCreateGroup } from "./EPIControlCreateGroup";
import { EpiControlCreateItem } from "./EPIControlCreateItem";
import { EpiControlCreateSize } from "./EPIControlCreateSize";
import { EPIControlHeader } from "./EPIControlHeader";
import { EpiControlViewItem } from "./EPIControlViewItem";
import { EpiControlViewSize } from "./EPIControlViewSize";


export const EPIControl = {
    Header: EPIControlHeader,
    CreateGroup: EpiControlCreateGroup,
    CreateItem: EpiControlCreateItem,
    CreateSize: EpiControlCreateSize,
    ViewItem: EpiControlViewItem,
    ViewSize: EpiControlViewSize
}