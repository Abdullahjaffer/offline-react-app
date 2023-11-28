import CryptoJS from "crypto-js";

export const encryptData = (text: string, secret: string) => {
	const data = CryptoJS.AES.encrypt(JSON.stringify(text), secret).toString();
	return data;
};

export const decryptData = (text: string, secret: string) => {
	const bytes = CryptoJS.AES.decrypt(text, secret);
	const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	return data;
};
