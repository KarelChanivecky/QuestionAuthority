export function getISOtime(){
    const timeObj = new Date();
    return `${timeObj.getFullYear}-${timeObj.getMonth}-${timeObj.getDate}T${timeObj.getHours}:${timeObj.getMinutes}:${timeObj.getSeconds}`;
}