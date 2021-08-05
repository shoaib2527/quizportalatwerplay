import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            "type": "service_account",
            "project_id": "quiz-app-werplay",
            "private_key_id": "2ed348441eb86e5c24c26c59f2113f5f1b6ff113",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDP5whIkWgokcCv\npml8GcmZ06dzXh3ElR/4getGYhGJ7CJZI14Wap4byyoSJ90y3Pdb0UtJH3thcmf+\nKB/RkBgHhIgxFJ8/gk0Z5oFHD/xZeTmTN8PMtRK9qu1oJeOxDnx7veISwLLkAgGJ\nWNlk+Pvo/L2c7LCZ61o8I25Ps1SidQgtp4mHSTWH0zcNzQ8klU6ABiU9uSDOvJ/7\nr68ngGWlU82R5nk++XHh1qlk/UY7iAWLipyzxf1/iPqiWzy6A0/qPTa15i2ATgxz\nM8FfQuUkacBDEnlfe7k6XVzQqwpAAh4TMd2V6CODxsrkhjneteoN2jGM/+6nM+OV\nh5LwL/KLAgMBAAECgf8kI4TNGHmCk9NqtQKhD9p7Ys84vqNuCH4GNI8xLNrfnqxZ\n0kwImX/iVO57OXK55K8axsbPbymDRt/Mziy5wNJsfB0wauVDpOLCHc9bCuxSoT/g\n11CxxMf9MDkUYYGyxVHeMKObnuN5vt+FgGxJoP4pAcX0ATCxkLeevInwULvlgSIN\nl49hvyCmZxyGnP/HnCWAAaIKJBDqr37pTnXOz2klrGUBRl346JmyuY5d9ptnLt4U\nde7vq79LpsgJa1agkUoztLt/V0a8dVUfhai02Am/Z0tAfbodBchLTXBczwljMXu5\nrH4MkbZR4gKMQqPs0kShSFV/Ofk/aF70mNDnC20CgYEA9bY0OsUFD+0fmTJKukXc\npxDzJkme9n8raK53gbY7I6Rxr1/c0YKPb094s3OjHPz8vN4T0Dhs2GPHvUp4U29q\nonMIw3YVK/QVcWqwrHTwiF7/UNUKiXtjOmOQS9HZXUJnvFmlSWAcuOh1TIge6H30\nBA9VgqQrZIbeiE23+aDvYDUCgYEA2JuMi1BSeZ1nU3tLiULElYr1d394eoTFfqeG\nlFXT0hGoWZLcXmdpl4fd76lUjq/uZs4XzRMysj7ar1D6o/15g6VAVVCnKV+5phH6\nRH/gxqvdQINm+sumCfXz/smeevaG/YTevhLsbh8WEXS8hvaNAwm7isjXlcfY/SV6\nnxDF378CgYEAxxBpeh96PW/nhK7I+eZ1oGhMBX3pqlxW58VJDq57dSHZ9LIebSJw\nYEarS/9oa6jOfZkRxkSgciNMhB/cIgSHCLtXozt8ZZKm+K7uGZnX8TO9d1hR5BYx\nyvE0yyhlCHgvINoj3bFfM7MorOsu1z6LvepKZb/pY9UcXqNQZI4swO0CgYBXqjyr\ndYqrpcTXyKK9nsQpMeA+yNxd2baEmBCjoEjmUDcuaX2+x2O47EgqYwHR7eoyuV5w\npUBzW3TuV3vZOxEe8pai8M12tUNRrxz29Dporc4R+hyHjDxa86wYhkkZwwTHPitY\nChieSP6JehGDHe3cOOgqNzbpa8SqT6zdC9DJyQKBgCpEY0ELAoH6JIEtaNJyFOFM\nbTMnRn/94CLJ9gqcmTi9lB/01JBQZnaeQIcmZY0vQkZy3r3HjYE0fsqJXJouHm8Y\nZTLCelVwe5ooaa4gRtoiDT8eTZsydVTSPavBbekyaqdzYFC5khTuGxSPg7JZKQtY\nqPNOw3QheU3tS16PNkJ5\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-b559i@quiz-app-werplay.iam.gserviceaccount.com",
            "client_id": "103819778375356027353",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b559i%40quiz-app-werplay.iam.gserviceaccount.com"
        }
        ),
        databaseURL: "https://quiz-app-werplay.firebaseio.com/" //process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
}

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth }