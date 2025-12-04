import jwt from "jsonwebtoken";

//generate a random captcha text
const generateCaptchaText = (length = 6) => {
    const characters = "ABCDEFGHJKLMNPQUSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"; // not included 0,1,O,o,I,l as its confusing to guess
    let randomText = "";

    for (let i = 0; i < length; i++) {
        randomText += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // console.log(randomText);
    return randomText;
}

//create a captcha token with embedded captcha text
const createCaptchaToken = () => {
    const captchaText = generateCaptchaText();

    const token = jwt.sign(
        { captcha: captchaText }, //store captcha text in payload
        process.env.CAPTCHA_SECRET || process.env.JWT_SECRET,
        { expiresIn: "2m" }
    ); //captcha valid for 2 minutes
    return { captchaText, token }
};

//verify the captcha entered by user is correct or not
const verifyCaptchaToken = (token, userInput) => {
    try {

        //decode the token to get original captcha text
        const decoded = jwt.verify(token, process.env.CAPTCHA_SECRET);

        //extract original captcha text
        const original = decoded.captcha

        //compare original captcha with user input (case insensitive)
        if (original && original.toLowerCase() === userInput.trim().toLowerCase())
            return true;

    } catch (error) {
        return false;
    }
}

export { createCaptchaToken, verifyCaptchaToken };