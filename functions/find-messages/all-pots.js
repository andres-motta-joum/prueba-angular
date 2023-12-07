const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.findAllPots = functions.https.onCall(async (data, context) => {
  const messagesRef = admin.firestore().collection("mensajes");
  const snapshot = await messagesRef.get();

  const messages = [];
  snapshot.forEach(doc => {
    const message = doc.data();
    message.id = doc.id;
    messages.push(message);
  });

  let results;

  if(data.date){
    // Convierte data.date en un objeto Date
    let targetDate = new Date(data.date);
    targetDate.setHours(0, 0, 0, 0);

    // Calcula la fecha del día siguiente
    let nextDate = new Date(targetDate.getTime());
    nextDate.setDate(targetDate.getDate() + 1);

    // Filtra los mensajes donde la fecha es igual a data.date
    results = messages.filter(message => {
        let messageDate = message.fecha.toDate();
        return messageDate >= targetDate && messageDate < nextDate;
    });

  }else{
    results = messages
  }

  return results

});
  