const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.createMessage = functions.https.onCall(async (data, context) => {
  const messagesRef = admin.firestore().collection("mensajes");
  const snapshot = await messagesRef.where('idUsuario', '==', data.userId).get();

  const messages = [];
  snapshot.forEach(doc => {
    const message = doc.data();
    message.id = doc.id;
    messages.push(message);
  });

  // Obtén la fecha actual al inicio del día (00:00:00)
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filtra los mensajes donde la fecha es igual al día de hoy
  let messagesToday = messages.filter(message => {
    return message.fecha.toDate() >= today;
  });

  // La cantidad de mensajes de hoy es simplemente la longitud del array filtrado
  let count = messagesToday.length;

  if(count < 5){
    console.log("Ejecutar")
    await admin.firestore().collection('mensajes').add({
      idUsuario: data.userId,
      titulo: data.title,
      descripcion: data.description,
      fecha: new Date(),
      fechaString: data.dateString,
      nombre: data.name
    });
    return true
  }else{
    return false
  }
});