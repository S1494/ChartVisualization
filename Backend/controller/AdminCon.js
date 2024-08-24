import projectSchema from "../model/projectSchema.js";

export const projectDataGet = async (req, res) => {
  try {
    const fdata = await projectSchema.find();

    if (fdata.length === 0) {
      res.status(400).json({
        message: "Data not found",
        status: 400,
      });
    }

    res.status(200).json({
      message: fdata,
      status: 200,
    });
  } catch (error) {}
};
