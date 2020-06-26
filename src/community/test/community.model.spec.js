const mongoose = require("mongoose");
const Community = require("../community.model");
const newCommunity = require("./resources/new-community.json");

describe("CommunityModel", () => {
  let connection;
  let activeId;

  beforeAll(async () => {
    connection = await mongoose.connect(global.__MONGO_URI__, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  });

  beforeEach(async () => {
    const community = new Community({
      name: "dwaso",
      population: 30000,
      location: {
        coordinates: [220, -293],
      },
    });

    await community.save();
    activeId = community.id;
  });

  afterEach(async () => {
    await Community.deleteMany();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("initialises community", async () => {
    const community = new Community({
      name: newCommunity.name,
      location: {
        coordinates: [newCommunity.lat, newCommunity.long],
      },
      population: newCommunity.population,
    });

    expect.assertions(5);
    await community.save();

    expect(community._id).toBeDefined();
    expect(community.name).toBe(newCommunity.name);
    expect(community.population).toBe(newCommunity.population);
    expect(community.location.coordinates[0]).toBe(newCommunity.lat);
    expect(community.location.coordinates[1]).toBe(newCommunity.long);
  });

  it("throws error if required fields are empty", async () => {
    const community = new Community({});

    try {
      await community.save();
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.population).toBeDefined();
      expect(err.errors.population.kind).toBe("required");
      expect(err.errors.name).toBeDefined();
      expect(err.errors.name.kind).toBe("required");
    }
  });

  it("throws an error if id invalid", async () => {
    const invalidId = "sdkldlkdd";

    try {
      await Community.findOne({ _id: invalidId });
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.CastError);
      expect(err.kind).toBe("ObjectId");
    }
  });

  it("gets community with valid", async () => {
    const community = await Community.findOne({
      _id: activeId,
    });

    expect(community).not.toBe(null);
    expect(community._id).toBeDefined();
    expect(community.name).toBeDefined();
    expect(community.population).toBeDefined();
    expect(community.location).toBeDefined();
  });
});
