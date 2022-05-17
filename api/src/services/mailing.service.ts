import nodemailer from 'nodemailer';
/* Creating a transporter object that will be used to send emails. */
import Mail from 'nodemailer/lib/mailer';
import { InternalServerError } from '../utils/errors/internal-server.error'

export class MailingService {
    constructor(
        private transporter = nodemailer.createTransport('smtp://'+process.env.SMTP_LOGIN+':'+process.env.SMTP_PASSWORD+'@' + process.env.SMTP_HOST),
    ) {}

    sendEmail(mailOptions: Mail.Options[]):  Promise<any> {
        const mailPromises = mailOptions.map((mail) => {
            mail.from = process.env.SENDER_ADDRESS
            return this.transporter.sendMail(mail)
        });
        return Promise.all(mailPromises).catch(error => {
            if(error){
                throw new InternalServerError(error.message);
            }
        }).then(success => success);
    }
}

exports.MailingService = MailingService;
