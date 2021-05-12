function createCertificate() {
  return new Promise(function (resolve, reject) {
    try {
      const first = `openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout localhost.key -out localhost.pem -subj "/C=US/CN=Example-Root-CA"`;
      const second = `openssl x509 -outform pem -in localhost.pem -out localhost.crt`;
      resolve();
    } catch (err) {
      reject(err);
      console.error("createCeritificateErr", err);
    }
  });
}

(async () => {
  console.log("Init Boiler Plate\n");
  await createCertificate();
})();
