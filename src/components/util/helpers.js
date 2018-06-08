import moment from "moment";
export const createNewEvent =( user, photoURL, event) => {
  event.date = moment(event.date).toDate();
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || null,
    createtAt: Date.now(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: photoURL || null,
        displayName: user.displayName,
        host: true
      }
    }
  }

}

export const objectToArray = (object) => {
  if (object){
    return Object.entries(object).map(e => Object.assign(e[1], {id:e[0]}));
  }
  
}