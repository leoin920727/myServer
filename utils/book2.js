function sendMail(receiver, title, content) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cleanservices1004@gmail.com",
      pass: "vmya hhev ezbx zbth",
    },
  });

  transporter
    .sendMail({
      from: '"浣熊管家" <cleanservices1004@gmail.com>', // sender address
      to: receiver, // list of receivers
      subject: title, // Subject line
      html: content, // html body
    })
    .then((info) => {
      console.log({ info });
    })
    .catch(console.error);
}

exports = { sendMail };
