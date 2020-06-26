const HTTPStatus = require("http-status");
const Community = require("./community.model");
const { validationResult } = require("express-validator");

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HTTPStatus.BAD_REQUEST).json(errors);
  }

  const { lat, long, name, population } = req.body;

  try {
    const community = new Community({
      name,
      population,
      location: {
        coordinates: [long, lat],
      },
    });

    community = await community.save();

    return res.status(HTTPStatus.CREATED).json(community);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(HTTPStatus.CONFLICT).json({
        message: `community with name ${name} is already available`,
      });
    }

    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      message: "oops something that shouldnt happen happened. try again",
    });
  }
};

const getSingle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HTTPStatus.BAD_REQUEST).json(errors);
  }

  const { id } = req.params;

  const community = await Community.findOne({ _id: id });
  if (!community) {
    return res.status(HTTPStatus.NOT_FOUND).json({
      message: `community of id '${id}' could not be found.`,
    });
  }

  res.json(community);
};

module.exports = {
  create,
  getSingle,
};
