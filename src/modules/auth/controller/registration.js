import { compare, hash } from "../../../utils/HashAndCompare.js";
import studentModel from "../../../../DB/model/Student.model.js";
import sendEmail from "../../../utils/email.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { nanoid } from 'nanoid'

import {
    generateToken,
    verifyToken,
  } from "../../../utils/GenerateAndVerifyToken.js";
import { customAlphabet } from "nanoid";

export const signup=asyncHandler(
    async(req,res,next)=>{
    const {FirstName,LastName,email,password,phone}=req.body

     if (await studentModel.findOne({ email })) {
    return next(new Error(`!Email is Already Exist`, { cause: 409 }));
  }
  
  if (await studentModel.findOne({ phone })) {
    return next(new Error("!Phone is Already Exist", { cause: 409 }));
  }
  const token = generateToken({
    payload: { email },
    signature: process.env.EMAIL_TOKEN,
    expiresIn: 60 * 10,
  });
  const refreshtoken = generateToken({
    payload: { email },
    signature: process.env.EMAIL_TOKEN,
    expiresIn: 60 * 60 * 24 ,
  });
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  const relink = `${req.protocol}://${req.headers.host}/auth/RequestNewconfirmEmail/${refreshtoken}`;

  const html = `
    <html>

<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <meta name="format-detection" content="telephone=no" />

  <style>
    /* Reset styles */
    body {
      margin: 0;
      padding: 0;
      min-width: 100%;
      width: 100% !important;
      height: 100% !important;
    }

    body,
    table,
    td,
    div,
    p,
    a {
      -webkit-font-smoothing: antialiased;
      text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      line-height: 100%;
    }

    table,
    td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse !important;
      border-spacing: 0;
    }

    img {
      border: 0;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }

    @media all and (min-width: 560px) {
      body {
        margin-top: 30px;
      }
    }
    
    /* Rounded corners */
    @media all and (min-width: 560px) {
      .container {
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        -khtml-border-radius: 8px;
      }
    }
    /* Links */
    a,
    a:hover {
      color: #127DB3;
    }

    .footer a,
    .footer a:hover {
      color: #999999;
    }
  </style>

  <!-- MESSAGE SUBJECT -->
  <title>Confirm email template</title>

</head>

<!-- BODY -->
<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0;  padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
	background-color: #F0F0F0;
	color: #000000;" bgcolor="#F0F0F0" text="#000000">
  <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
    <tr>
      <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;" bgcolor="#F0F0F0">
        <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#FFFFFF" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="container">
          
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
              <hr color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: #000000;
			font-family: sans-serif;" class="paragraph">
              Hi <span style= color:#3969d5>${FirstName} ${LastName}</span> ,<br> In order to start using your new account, you need to confirm your email address.
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button">
              <a href=${link} target="_blank" style="text-decoration: none;">
                <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                  <tr>
                    <td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: none; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#3969d5"><a target="_blank" style="text-decoration: none;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;" href=${link}>
						Verify Email Address
					</a>
                    </td>
                  </tr>
									 
                </table>
              </a>
            </td>
          </tr>
					 <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button">
              <a href=${relink}" target="_blank" style="text-decoration: none;">
                <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                  <tr>
                    <td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: none; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#3969d5"><a target="_blank" style="text-decoration: none;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;" href=${relink}>
						Resend New Mail
					</a>
                    </td>
                  </tr>
									 
                </table>
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
              <hr color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 20px;
			padding-bottom: 25px;
			color: #000000;
			font-family: sans-serif;" class="paragraph">
              If you did not sign up for this account you can ignore this email and the account will be deleted.
            </td>
          </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" align="center" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="wrapper">
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
			padding-top: 20px;
			padding-bottom: 20px;
			color: #999999;
			font-family: sans-serif;" class="footer">
              Check out our extensive FAQ for more information
              or contact us through ourContact Form. Our support
              team is available to help you 24 hours a day, seven days a week.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  if (!(await sendEmail({ to: email, subject: "Confirm Email", html }))) {
    return next(new Error("Email Rejected", { cause: 400 }));
  }
 
    // Hash Password
    const HashPassword = hash({ plaintext: password });
    //Creat User
    const UserName = `${FirstName} ${LastName}`; 
    const user = await studentModel
      .create({
          FirstName,
          LastName,
          UserName,
          email,
          phone,
        password: HashPassword,
      });

      const userData = await studentModel
      .findById(user._id)
      .select({ password:0,forgetCode:0,ChangepasswordTime:0 ,reset:0});
    


      return res.status(201).json({ Status: true, cause: 201, message: "Success", data: userData });  
  

}
)

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { email } = verifyToken({ token, signature: process.env.EMAIL_TOKEN });

  if (!email) {
    return next(new Error("In-Valid Token PayLoad", { cause: 404 }));
  }
  const user = await studentModel.updateOne({ email }, { confirmEmail: true });

  if (user.matchedCount) {
    return res.status(200).redirect(`${process.env.FRONT}login`);
  } else {
    return res.status(200).redirect(`${process.env.FRONT}emailsignup`);
  }
});

export const RequestNewconfirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { email } = verifyToken({ token, signature: process.env.EMAIL_TOKEN });

  if (!email) {
    return next(new Error("In-Valid Token PayLoad", { cause: 404 }));
  }
  const user = await studentModel.findOne({ email });
  if (!user) {
    return next(new Error("Not Registers Account", { cause: 404 }));
  }
  if (user.confirmEmail) {
    return res.status(200).redirect(`${process.env.FRONT}login`);
  }
  const NewToken = generateToken({
    payload: { email },
    signature: process.env.EMAIL_TOKEN,
    expiresIn: 60 * 2,
  });

  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${NewToken}`;

  const html = `
    <html>

<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <meta name="format-detection" content="telephone=no" />

  <style>
    /* Reset styles */
    body {
      margin: 0;
      padding: 0;
      min-width: 100%;
      width: 100% !important;
      height: 100% !important;
    }

    body,
    table,
    td,
    div,
    p,
    a {
      -webkit-font-smoothing: antialiased;
      text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      line-height: 100%;
    }

    table,
    td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse !important;
      border-spacing: 0;
    }

    img {
      border: 0;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }

    @media all and (min-width: 560px) {
      body {
        margin-top: 30px;
      }
    }
    
    /* Rounded corners */
    @media all and (min-width: 560px) {
      .container {
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        -khtml-border-radius: 8px;
      }
    }
    /* Links */
    a,
    a:hover {
      color: #127DB3;
    }

    .footer a,
    .footer a:hover {
      color: #999999;
    }
  </style>

  <!-- MESSAGE SUBJECT -->
  <title>Confirm email template</title>

</head>

<!-- BODY -->
<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0;  padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
	background-color: #F0F0F0;
	color: #000000;" bgcolor="#F0F0F0" text="#000000">
  <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
    <tr>
      <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;" bgcolor="#F0F0F0">
        <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#FFFFFF" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="container">
          
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
              <hr color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: #000000;
			font-family: sans-serif;" class="paragraph">
              Hi <span style= color:#3969d5>${user.FirstName} ${user.LastName}</span> ,<br> In order to start using your new account, you need to confirm your email address.
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button">
              <a href=${link} target="_blank" style="text-decoration: none;">
                <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                  <tr>
                    <td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: none; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#3969d5"><a target="_blank" style="text-decoration: none;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;" href=${link}>
						Verify Email Address
					</a>
                    </td>
                  </tr>
									 
                </table>
              </a>
            </td>
          </tr>								 
                </table>
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
              <hr color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 20px;
			padding-bottom: 25px;
			color: #000000;
			font-family: sans-serif;" class="paragraph">
              If you did not sign up for this account you can ignore this email and the account will be deleted.
            </td>
          </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" align="center" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="wrapper">
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
			padding-top: 20px;
			padding-bottom: 20px;
			color: #999999;
			font-family: sans-serif;" class="footer">
              Check out our extensive FAQ for more information
              or contact us through ourContact Form. Our support
              team is available to help you 24 hours a day, seven days a week.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  if (!(await sendEmail({ to: user.email, subject: "Confirm Email", html }))) {
    return next(new Error("Email Rejected", { cause: 400 }));
  }
  return res.status(200).send("<p>Please Check your inbox Gmail</p>");
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, phone , password } = req.body;
  const user = await studentModel.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
    return next(new Error("No Account with This Phone or Email", { cause: 404 }));
  }
  if (!user.confirmEmail) {
    return next(new Error("Please Confirm Your Email First", { cause: 400 }));
  }
  if (!compare({ plaintext: password, hashValue: user.password })) {
    return next(new Error("in-Valid Password , email or Phone ", { cause: 404 }));
  }
  const data = await studentModel.updateOne(
    { $or: [{ email }, { phone }] }, 
    { active: true }
);  const access_token = generateToken({
    payload: { _id: user._id, role: user.role },
    expiresIn: 60 * 30,
  });
  const refreshtoken = generateToken({
    payload: { _id: user._id, role: user.role },
    expiresIn: 60 * 60 * 24 * 365,
  });
  const userData = await studentModel
  .findById(user._id)
  .select({ password:0,forgetCode:0,ChangepasswordTime:0,reset:0});


  return res
    .status(200)
    .json({Status:true ,cause:201, message: "Success", data: userData, access_token, refreshtoken });
});

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email ,phone } = req.body;
  const nanoid = customAlphabet("1234567890", 4);

  const user = await studentModel.findOneAndUpdate(
    { $or: [{ email }, { phone }] }, 
    { forgetCode: nanoid() },
    {
      new: true,
    }
  );
   if (!user) {
    return next(new Error("No Account with This Phone or Email", { cause: 404 }));
  }

  if (!user.confirmEmail) {
    return next(new Error("Please Confirm Your Email First", { cause: 400 }));
  }
  const html = `
  <html>

<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0;">
<meta name="format-detection" content="telephone=no" />

<style>
  /* Reset styles */
  body {
    margin: 0;
    padding: 0;
    min-width: 100%;
    width: 100% !important;
    height: 100% !important;
  }

  body,
  table,
  td,
  div,
  p,
  a {
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    line-height: 100%;
  }

  table,
  td {
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    border-collapse: collapse !important;
    border-spacing: 0;
  }

  img {
    border: 0;
    line-height: 100%;
    outline: none;
    text-decoration: none;
    -ms-interpolation-mode: bicubic;
  }

  #outlook a {
    padding: 0;
  }

  .ReadMsgBody {
    width: 100%;
  }

  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
    line-height: 100%;
  }

  @media all and (min-width: 560px) {
    body {
      margin-top: 30px;
    }
  }
  
  /* Rounded corners */
  @media all and (min-width: 560px) {
    .container {
      border-radius: 8px;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      -khtml-border-radius: 8px;
    }
  }
  /* Links */
  a,
  a:hover {
    color: #127DB3;
  }

  .footer a,
  .footer a:hover {
    color: #999999;
  }
</style>

<!-- MESSAGE SUBJECT -->
<title>Confirm email template</title>

</head>

<!-- BODY -->
<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0;  padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
background-color: #F0F0F0;
color: #000000;" bgcolor="#F0F0F0" text="#000000">
<table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
  <tr>
    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;" bgcolor="#F0F0F0">
      <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#FFFFFF" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
max-width: 560px;" class="container">
        
        <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
    padding-top: 25px;" class="line">
            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
          </td>
        </tr>
        <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
    padding-top: 25px; 
    color: #000000;
    font-family: sans-serif;" class="paragraph">
            Hi <span style= color:#3969d5>${user.FirstName} ${user.LastName}</span> ,<br> In order to start using your new account, you need to confirm your email address.
          </td>
        </tr>
        <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
    padding-top: 25px;
    padding-bottom: 5px;" class="button">
           
              <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                <tr>
                  <td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: none; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                      bgcolor="#3969d5">
          ${user.forgetCode}
        </a>
                  </td>
                </tr>
                 
              </table>
            </a>
          </td>
        </tr
              </table>
            </a>
          </td>
        </tr>
        <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
    padding-top: 25px;" class="line">
            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
          </td>
        </tr>
        <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
    padding-top: 20px;
    padding-bottom: 25px;
    color: #000000;
    font-family: sans-serif;" class="paragraph">
            If you did not sign up for this account you can ignore this email and the account will be deleted.
          </td>
        </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
max-width: 560px;" class="wrapper">
        <tr>
          <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #999999;
    font-family: sans-serif;" class="footer">
            Check out our extensive FAQ for more information
            or contact us through ourContact Form. Our support
            team is available to help you 24 hours a day, seven days a week.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
  `;
  //////////////////Problem Here /////////////////////
  
  if (!(await sendEmail({ to: user.email, subject: "Reset Password", html }))) {
    return next(new Error("Email Rejected", { cause: 400 }));
  }
  return user
    ? res.status(200).json({Status:true ,cause:200, message: "Code Has been Sent To your gmail Please Check it" })
    : next(new Error("Not Registers Account", { cause: 404 }));
});

export const CheckCode = asyncHandler(async (req, res, next) => {
  const { email, phone,forgetCode } = req.body;
  const user = await studentModel.findOne({ $or: [{ email }, { phone }] });
  if (!user) {
  return next(new Error("No Account with This Phone or Email", { cause: 404 }));
}
  if (user.forgetCode != forgetCode) {
    return next(new Error("in-Valid Code", { cause: 404 }));
  }
  const data = await studentModel.findOneAndUpdate(
    { $or: [{ email }, { phone }] }, 
    { reset:true },
    {
      new: true,
    }
  );

  return res.status(200).json({Status:true ,cause:200, message: "Success" });
});

export const RestePassword = asyncHandler(async (req, res, next) => {
  const { email, phone ,password } = req.body;
  const user = await studentModel.findOne({ $or: [{ email }, { phone }] });

  if (!user) {
  return next(new Error("No Account with This Phone or Email", { cause: 404 }));
}
if(user.reset){
  if (compare({ plaintext: password, hashValue: user.password })) {
    return next(new Error("Enter Your New Password Please", { cause: 404 }));
  }
    user.password = hash({ plaintext: password });
    user.forgetCode = null;
    user.ChangepasswordTime = Date.now();
    user.reset=false
    await user.save();
    return res
      .status(201)
      .json({Status:true ,cause:201, message: "Password has been changed Successfully" });
  
}
else{
  return next(new Error("You can't Reset Your Password", { cause: 404 }));

}
});
