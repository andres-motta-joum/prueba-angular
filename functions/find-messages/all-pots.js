const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.findAllPots = functions.https.onCall(async (data, context) => {
  const messagesRef = admin.firestore().collection("mensajes");
  const snapshot = await messagesRef.get();

  let messages = [];
  snapshot.forEach(doc => {
    const message = doc.data();
    message.id = doc.id;
    messages.push(message);
  });


  if(data.date){
    // Convierte data.date en un objeto Date
    let targetDate = new Date(data.date);
    targetDate.setHours(0, 0, 0, 0);

    // Calcula la fecha del día siguiente
    let nextDate = new Date(targetDate.getTime());
    nextDate.setDate(targetDate.getDate() + 1);

    // Filtra los mensajes donde la fecha es igual a data.date
    messages = messages.filter(message => {
        let messageDate = message.fecha.toDate();
        return messageDate >= targetDate && messageDate < nextDate;
    });

  }else{
    messages = messages
  }

  if(data.words && data.words !== ''){
    let words = data.words.toLowerCase();
  
    messages = messages.filter(message => {
      let title = message.titulo.toLowerCase();
      return title.includes(words);
    });
  }

  return messages

});
  