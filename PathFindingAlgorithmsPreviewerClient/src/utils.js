export function getDataFromForm(form, inputDescriptor){
    return form.querySelector(inputDescriptor).value;
}

export function swapColumnsHeight(colArr, idx1, idx2) {
    let tHght = colArr[idx1].getHeight();
    colArr[idx1].setHeight(colArr[idx2].getHeight());
    colArr[idx2].setHeight(tHght);
    return colArr;
}