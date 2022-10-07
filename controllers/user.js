import User from "../models/user.js";
import sodium from "sodium";

export const createSignature = async (req, res, next) => {
  try {
    const user = sodium.api.crypto_sign_keypair();
    const data = {
      publiceKey: user.publicKey.toString("hex"),
      privateKey: user.secretKey.toString("hex"),
    };
    const newUser = new User({
      email: req.body.email,
      public_key: data.publiceKey,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
export const keyVerification = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const publicKey = user.public_key;
    var message = Buffer.from("node-sodium is cool", "hex");
    var signedMsg = sodium.api.crypto_sign(
      message,
      Buffer.from(req.headers.signature, "hex")
    );
    if (sodium.api.crypto_sign_open(signedMsg, Buffer.from(publicKey, "hex"))) {
      res.status(200).json({
        validation: true,
        message: "Your secret key is valid.",
      });
    } else {
      res.status(200).json({
        validation: false,
        message: "Your secret key is not valid.",
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: "secret Key is not valid or something went wrong.",
    });
  }
};

