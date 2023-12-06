const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.crearProducto = functions.https.onCall((data, context) => {
    return admin.firestore().collection('usuarios').add({nombre: "Andres"})
    .then(() => {
      return {message: 'Producto creado exitosamente'};
    })
    .catch((error) => {
      throw new functions.https.HttpsError('unknown', error.message, error);
    });
});
