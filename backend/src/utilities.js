export function getISOtime(){
    const timeObj = new Date();
    const month = timeObj.getMonth() + 1;
    return `${timeObj.getFullYear()}-${month.toString().padStart(2, "0")}-${timeObj.getDate().toString().padStart(2, "0")}T${timeObj.getHours().toString().padStart(2, "0")}:${timeObj.getMinutes().toString().padStart(2, "0")}:${timeObj.getSeconds().toString().padStart(2, "0")}`;
}