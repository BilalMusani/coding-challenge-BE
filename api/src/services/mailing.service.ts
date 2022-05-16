import nodemailer from 'nodemailer';
/* Creating a transporter object that will be used to send emails. */
import Mail from 'nodemailer/lib/mailer';
import { InternalServerError } from '../utils/errors/internal-server.error'

export class MailingService {
    constructor(
        private transporter = nodemailer.createTransport('smtp://'+process.env.SMTP_LOGIN+':'+process.env.SMTP_PASSWORD+'@' + process.env.SMTP_HOST),
    ) {}

    sendEmail(mailOptions: Mail.Options):  Promise<any> {
        mailOptions.from = process.env.SENDER_ADDRESS;
        return new Promise((resolve,reject)=> {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    reject(new InternalServerError(error.message));
                }
                resolve(true);
            });
        });

    }
}

exports.MailingService = MailingService;
