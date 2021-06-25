const { Client, logger, Variables, BasicAuthInterceptor } = require('camunda-external-task-client-js');
const firebase = require("firebase/app");
const defaultDatabase = require("firebase/database");
const open = require('open');

const basicAuthentication = new BasicAuthInterceptor({
  username: "demo",
  password: "demo"
});

let firebaseConfig = {
  apiKey: "AIzaSyC8viICmIX7UCfFrlZhyMvGOlVPK4xYjdQ",
  authDomain: 'akdenizuniproject.firebaseapp.com',
  databaseURL: "https://akdenizuniproject-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: 'akdenizuniproject',
  storageBucket: 'akdenizuniproject.appspot.com',
  messagingSenderId: '931606698445',
  appId: '1:931606698445:web:c09ebfef5826e52978cc84'
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000, interceptors: basicAuthentication };

const client = new Client(config);


client.subscribe('aday_listesinde', async function ({ task, taskService }) {

  const allVariable = task.variables.getAll()
  const businessKey = task.variables.get("businessKey")

  const candidate = database.ref('candidates/' + businessKey)

  candidate.on('value', (snapshot) => {
    const data = snapshot.val();
    database.ref('ilgilenilen_adaylar/' + businessKey).set(data)
  })
  
  console.log("allVariable", allVariable);

  // open('https://docs.camunda.org/get-started/quick-start/success');

  await taskService.complete(task);
});

client.subscribe('bastan_degerlendirilecekler', async function ({ task, taskService }) {

  const allVariable = task.variables.getAll()
  const businessKey = task.variables.get("businessKey")

  const candidate = database.ref('candidates/' + businessKey);
  candidate.on('value', (snapshot) => {
    const data = snapshot.val();
    database.ref(`bastan_degerlendirilecekler/` + businessKey).set(data);
  });

  console.log("allVariable", allVariable);

  await taskService.complete(task);
});

client.subscribe('adayin_tecrubesi_yetersiz', async function ({ task, taskService }) {

  const allVariable = task.variables.getAll()
  const businessKey = task.variables.get("businessKey")

  const candidate = database.ref('candidates/' + businessKey);
  candidate.on('value', (snapshot) => {
    const data = snapshot.val();
    database.ref(`adayin_tecrubesi_yetersiz/` + businessKey).set(data);
  });

  console.log("allVariable", allVariable);

  await taskService.complete(task);
});

client.subscribe('adayin_sosyal_becerileri_uygun_degil', async function ({ task, taskService }) {

  const allVariable = task.variables.getAll()
  const businessKey = task.variables.get("businessKey")

  const candidate = database.ref('candidates/' + businessKey);
  candidate.on('value', (snapshot) => {
    const data = snapshot.val();
    database.ref(`adayin_sosyal_becerileri_uygun_degil/` + businessKey).set(data);
  });

  console.log("allVariable", allVariable);

  await taskService.complete(task);
});

client.subscribe('adayin_teknigi_yetersiz', async function ({ task, taskService }) {

  const allVariable = task.variables.getAll()
  const businessKey = task.variables.get("businessKey")

  const candidate = database.ref('candidates/' + businessKey);
  candidate.on('value', (snapshot) => {
    const data = snapshot.val();
    database.ref(`adayin_teknigi_yetersiz/` + businessKey).set(data);
  });

  console.log("allVariable", allVariable);

  await taskService.complete(task);
});

client.subscribe('teklifi_reddedenler', async function ({ task, taskService }) {

  const allVariable = task.variables.getAll()
  const businessKey = task.variables.get("businessKey")

  const candidate = database.ref('candidates/' + businessKey);
  candidate.on('value', (snapshot) => {
    const data = snapshot.val();
    database.ref(`teklifi_reddedenler/` + businessKey).set(data);
  });

  console.log("allVariable", allVariable);

  await taskService.complete(task);
});

client.subscribe('calisanlarimiz', async function ({ task, taskService }) {

  const allVariable = task.variables.getAll()
  const businessKey = task.variables.get("businessKey")

  const candidate = database.ref('candidates/' + businessKey);
  candidate.on('value', (snapshot) => {
    const data = snapshot.val();
    database.ref(`calisanlarimiz/` + businessKey).set(data);
  });

  console.log("allVariable", allVariable);

  await taskService.complete(task);
});

client.subscribe('kara_liste', async function ({ task, taskService }) {

  const allVariable = task.variables.getAll()
  const businessKey = task.variables.get("businessKey")

  const candidate = database.ref('candidates/' + businessKey);
  candidate.on('value', (snapshot) => {
    const data = snapshot.val();
    database.ref(`kara_liste/` + businessKey).set(data);
  });

  console.log("allVariable", allVariable);

  await taskService.complete(task);
});

