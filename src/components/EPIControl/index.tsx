import { EpiControlCreateGroup } from "./EPIControlCreateGroup";
import { EpiControlCreateItem } from "./EPIControlCreateItem";
import { EpiControlCreateSize } from "./EPIControlCreateSize";
import { EpiControlEditSize } from "./EPIControlEditSize";
import { EPIControlHeader } from "./EPIControlHeader";
import { EpiControlViewItem } from "./EPIControlViewItem";
import { EpiControlViewSize } from "./EPIControlViewSize";


export const EPIControl = {
    Header: EPIControlHeader,
    CreateGroup: EpiControlCreateGroup,
    CreateItem: EpiControlCreateItem,
    CreateSize: EpiControlCreateSize,
    EditSize: EpiControlEditSize,
    ViewItem: EpiControlViewItem,
    ViewSize: EpiControlViewSize
}