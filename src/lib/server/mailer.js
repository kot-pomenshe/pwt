import nodemailer from 'nodemailer';
import { MAIL_USER, MAIL_PASSWORD } from '$env/static/private';

// @ts-ignore
export async function send_conf_email({email, login, link}) {
	const transporter = nodemailer.createTransport({
		host: 'smtp.mail.ru',
		port: 465,
		auth: { user: MAIL_USER, pass: MAIL_PASSWORD },
	});

	transporter.sendMail({
		from: ' "Personal Word Trainer" <personal_word_trainer_01@mail.ru>',
		to: email,
		subject: 'Подверждение регистрации',
		text: `Активация`,
		html: `Добро пожаловать, ${login} <br> Для подтверждения регистрации на сайте Personal Word Trainer перейдите по ссылке: 
		<br> <a href=${link} target="_blank" title="Ссылка на активацию">Ссылка</a>`,
	});
}
