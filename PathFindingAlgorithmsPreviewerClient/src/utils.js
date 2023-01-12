export function getDataFromForm(form, inputDescriptor){
    return form.querySelector(inputDescriptor).value;
}