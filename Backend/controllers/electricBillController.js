const ElectricBill = require("../modals/electricBill");
const User = require("../modals/users");

const calculateBill = (unitsConsumed, ampereCharge) => {
  let serviceCharge = 0;
  let energyCharge = 0;

  if (unitsConsumed >= 0 && unitsConsumed <= 20) {
    switch (ampereCharge) {
      case "5A":
        serviceCharge = 30;
        energyCharge = 0;
        break;
      case "15A":
        serviceCharge = 50;
        energyCharge = 4;
        break;
      case "30A":
        serviceCharge = 75;
        energyCharge = 5;
        break;
      case "60A":
        serviceCharge = 125;
        energyCharge = 6;
        break;
      default:
        break;
    }
  } else if (unitsConsumed >= 21 && unitsConsumed <= 30) {
    switch (ampereCharge) {
      case "5A":
        serviceCharge = 50;
        energyCharge = 6.5;
        break;
      case "15A":
        serviceCharge = 75;
        energyCharge = 6.5;
        break;
      case "30A":
        serviceCharge = 100;
        energyCharge = 6.5;
        break;
      case "60A":
        serviceCharge = 125;
        energyCharge = 6.5;
        break;
      default:
        break;
    }
  } else if (unitsConsumed >= 31 && unitsConsumed <= 50) {
    switch (ampereCharge) {
      case "5A":
        serviceCharge = 50;
        energyCharge = 8.0;
        break;
      case "15A":
        serviceCharge = 75;
        energyCharge = 8.0;
        break;
      case "30A":
        serviceCharge = 100;
        energyCharge = 8.0;
        break;
      case "60A":
        serviceCharge = 125;
        energyCharge = 8.0;
        break;
      default:
        break;
    }
  } else if (unitsConsumed >= 51 && unitsConsumed <= 150) {
    switch (ampereCharge) {
      case "5A":
        serviceCharge = 75;
        energyCharge = 9.5;
        break;
      case "15A":
        serviceCharge = 100;
        energyCharge = 9.5;
        break;
      case "30A":
        serviceCharge = 125;
        energyCharge = 9.5;
        break;
      case "60A":
        serviceCharge = 150;
        energyCharge = 9.5;
        break;
      default:
        break;
    }
  } else if (unitsConsumed >= 151 && unitsConsumed <= 250) {
    switch (ampereCharge) {
      case "5A":
        serviceCharge = 100;
        energyCharge = 9.5;
        break;
      case "15A":
        serviceCharge = 125;
        energyCharge = 9.5;
        break;
      case "30A":
        serviceCharge = 150;
        energyCharge = 9.5;
        break;
      case "60A":
        serviceCharge = 200;
        energyCharge = 9.5;
        break;
      default:
        break;
    }
  } else {
    switch (ampereCharge) {
      case "5A":
        serviceCharge = 150;
        energyCharge = 11.0;
        break;
      case "15A":
        serviceCharge = 175;
        energyCharge = 11.0;
        break;
      case "30A":
        serviceCharge = 200;
        energyCharge = 11.0;
        break;
      case "60A":
        serviceCharge = 250;
        energyCharge = 11.0;
        break;
      default:
        break;
    }
  }

  const totalAmount = serviceCharge + energyCharge * unitsConsumed;

  return { totalAmount, serviceCharge, energyCharge };
};


const generateElectricBill = async (req, res) => {
  try {
    const { userId, unitsConsumed, ampereCharge, month, year } = req.body;

    if (!year) {
      return res.status(400).json({ error: "Year is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const existingBill = await ElectricBill.findOne({ userId, month, year });
    if (existingBill) {
      return res.status(400).json({
        error: "Electric bill already exists for this month and year",
      });
    }

    const totalAmount = calculateBill(unitsConsumed, ampereCharge);

    const electricBill = new ElectricBill({
      userId,
      unitsConsumed,
      ampereCharge,
      month,
      year,
      totalAmount,
    });
    await electricBill.save(); res.status(200).json({ totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  calculateBill,
  generateElectricBill,
};
