// GLOBAL
export const BranchesChoices = [
    { label: 'SPO', value: 1 },
    { label: 'REC', value: 2 },
    { label: 'SSA', value: 3 },
    { label: 'FOR', value: 4 },
    { label: 'MCZ', value: 5 },
    { label: 'NAT', value: 6 },
    { label: 'JPA', value: 7 },
    { label: 'AJU', value: 8 },
    { label: 'VDC', value: 9 },
    { label: 'CTG', value: 10 },
    { label: 'GVR', value: 11 },
    { label: 'VIX', value: 12 },
    { label: 'TCO', value: 13 },
    { label: 'UDI', value: 14 },
    { label: 'BMA', value: 15 },
    { label: 'BPE', value: 16 },
    { label: 'BEL', value: 17 },
    { label: 'BPB', value: 18 },
    { label: 'SLZ', value: 19 },
    { label: 'BAL', value: 20 },
    { label: 'THE', value: 21 },
    { label: 'BMG', value: 22 },
    { label: 'FMA', value: 23 },
    { label: 'JSR', value: 24 },
    { label: 'JC', value: 25 },
].map(item => ({ label: item.label, value: item.value }));


// PALLET
export const TypePalletChoices = [
    "PBR", "CHEP"
].map(item => ({ label: item, value: item }));


// PURCHASE REQUEST
export const StatusChoices = [
    "ABERTO", "ANDAMENTO", "CONCLUIDO", "CANCELADO",
].map(item => ({ label: item, value: item }));

export const DepartmentChoices = [
    { label: "NÃO INFORMADO", value: "DEFAULT" },
    { label: "DIRETORIA", value: "DIRETORIA" },
    { label: "FATURAMENTO", value: "FATURAMENTO" },
    { label: "FINANCEIRO", value: "FINANCEIRO" },
    { label: "RH", value: "RH" },
    { label: "FISCAL", value: "FISCAL" },
    { label: "MONITORAMENTO", value: "MONITORAMENTO" },
    { label: "OPERACIONAL", value: "OPERACIONAL" },
    { label: "FROTA", value: "FROTA" },
    { label: "EXPEDIÇÃO", value: "EXPEDICAO" },
    { label: "COMERCIAL", value: "COMERCIAL" },
    { label: "JURÍDICO", value: "JURIDICO" },
    { label: "DESENVOLVIMENTO", value: "DESENVOLVIMENTO" },
    { label: "TI", value: "TI" },
    { label: "FILIAIS", value: "FILIAIS" },
    { label: "COMPRAS", value: "COMPRAS" },
].map(item => ({ label: item.label, value: item.value }));

export const FormPaymentChoices = [
    { label: "NÃO INFORMADO", value: "DEFAULT" },
    { label: "A VISTA", value: "A_VISTA" },
    { label: "PARCELADO 1X", value: "PARCELADO_1X" },
    { label: "PARCELADO 2X", value: "PARCELADO_2X" },
    { label: "PARCELADO 3X", value: "PARCELADO_3X" },
    { label: "PARCELADO 4X", value: "PARCELADO_4X" },
    { label: "PARCELADO 5X", value: "PARCELADO_5X" },
    { label: "PARCELADO 6X", value: "PARCELADO_6X" },
    { label: "PARCELADO 7X", value: "PARCELADO_7X" },
    { label: "PARCELADO 8X", value: "PARCELADO_8X" },
    { label: "PARCELADO 9X", value: "PARCELADO_9X" },
    { label: "PARCELADO 10X", value: "PARCELADO_10X" },
    { label: "PARCELADO 11X", value: "PARCELADO_11X" },
    { label: "PARCELADO 12X", value: "PARCELADO_12X" },
].map(item => ({ label: item.label, value: item.value }));

export const CategoryChoices = [
    { label: "DEFAULT", value: "DEFAULT" },
    { label: "ALMOXARIFADO", value: "ALMOXARIFADO" },
    { label: "COTAÇÃO", value: "COTACAO" },
    { label: "NOTA FISCAL", value: "NOTA_FISCAL" },
].map(item => ({ label: item.label, value: item.value }));