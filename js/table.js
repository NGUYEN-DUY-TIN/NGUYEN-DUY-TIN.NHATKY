const MAX_COLUMN_SHOW = 20

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDddpR1J88o7paWLodCAsYxm4rTJIyiTqs",
  authDomain: "esp32-mit-1eeaa.firebaseapp.com",
  databaseURL: "https://esp32-mit-1eeaa-default-rtdb.firebaseio.com",
  projectId: "esp32-mit-1eeaa",
  storageBucket: "esp32-mit-1eeaa.appspot.com",
  messagingSenderId: "425160870404",
  appId: "1:425160870404:web:256d92dee0a590614d0351",
  measurementId: "G-MCV86WSNCV"
}

firebase.initializeApp(FIREBASE_CONFIG);
var firestore = firebase.firestore()


const getRowsData = async (number) => {
  const response = await new Promise((resolve, reject) => {
    firestore.collection("data")
      .orderBy("time", "desc")
      .limit(number)
      .get()
      .then((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        });
        resolve(data)
      });
  })

  return response.reverse()
}

const toDateTime = (miliSecond) => {
  const date = new Date(miliSecond)
  return `0${date.getDate()}`.slice(-2) + '-' + `0${date.getMonth() +1}`.slice(-2) + '-' + date.getFullYear() + ' ' + `0${date.getHours()}`.slice(-2) + ':' + `0${date.getMinutes()}`.slice(-2)
}
firestore.collection("data")
.onSnapshot(async (snapshot) => {
    const response = await getRowsData(MAX_COLUMN_SHOW)
    const tbodyElement = document.getElementById("tbody")
    let tbodyContent = ''
    response.map((item, index) => {
      tbodyContent += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td scope="col">${item.GiatriTanSo}</td>
        <td scope="col">${item.dienapbientan}</td>
        <td scope="col">${item.dienapbus}</td>
        <td scope="col">${item.dongdienbientan}</td>
        <td scope="col">${item.Start}</td>
        <td scope="col">${item.Stop}</td>
        <td scope="col">${item.for}</td>
        <td scope="col">${item.rev}</td>
        <td scope="col">${toDateTime(item.time)}</td>
      </tr>
    `
    })
    tbodyElement.innerHTML = tbodyContent
}, (error) => {
  console.log(error)
});
