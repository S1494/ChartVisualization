import projectSchema from "../model/projectSchema.js";

export const analyticGet = async (req, res) => {
  const dLimit = 10;

  const { sector, region, topic, pestle } = req.query;
  let { end_year } = req.query;
  if (end_year) end_year = parseInt(end_year, 10);
  const matchConditions = {};
  if (end_year) matchConditions.end_year = end_year;
  if (sector) matchConditions.sector = sector;
  if (region) matchConditions.region = region;
  if (topic) matchConditions.topic = topic;
  if (pestle) matchConditions.pestle = pestle;

  try {
    const data = await projectSchema.aggregate([
      {
        $facet: {
          country: [
            // country starts here
            {
              $match: {
                country: { $ne: "" }, // Match documents where 'country' is not an empty string
                ...matchConditions,
              },
            },
            {
              $group: {
                _id: "$country",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
            {
              $limit: dLimit,
            },
            {
              $addFields: {
                lable: "Geographical Distribution by Country",
              },
            },
          ],
          topic: [
            // topic start here
            {
              $match: {
                topic: { $ne: "" }, // Match documents where 'pestle' is not an empty string
                ...matchConditions,
              },
            },
            {
              $group: {
                _id: "$topic",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
            {
              $limit: dLimit,
            },
            {
              $addFields: {
                lable: "Topic-Wise Data Representation",
              },
            },
          ],
          region: [
            // region start here
            {
              $match: {
                region: { $ne: "" }, // Match documents where 'pestle' is not an empty string
                ...matchConditions,
              },
            },
            {
              $group: {
                _id: "$region",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
            {
              $limit: dLimit,
            },
            {
              $addFields: {
                lable: "Regional Data Visualization",
              },
            },
          ],
          end_year: [
            // end_year start here
            {
              $match: {
                end_year: { $ne: "" }, // Match documents where 'pestle' is not an empty string
                ...matchConditions,
              },
            },
            {
              $group: {
                _id: "$end_year",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
            {
              $limit: dLimit,
            },
            {
              $addFields: {
                lable: "Number of case where event occure in end years",
              },
            },
          ],
          start_year: [
            // end_year start here
            {
              $match: {
                start_year: { $ne: "" }, // Match documents where 'pestle' is not an empty string
                ...matchConditions,
              },
            },
            {
              $group: {
                _id: "$start_year",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
            {
              $limit: dLimit,
            },
            {
              $addFields: {
                lable: "Number of case where event occure in start years",
              },
            },
          ],
          relevance: [
            // end_year start here
            {
              $match: {
                relevance: { $ne: "" }, // Match documents where 'pestle' is not an empty string
                ...matchConditions,
              },
            },
            {
              $group: {
                _id: "$relevance",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
            {
              $limit: dLimit,
            },
          ],
          threecolumn: [
            {
              $match: {
                $and: [
                  { intensity: { $ne: "" } },
                  { country: { $ne: "" } },
                  { likelihood: { $ne: "" } },
                  { ...matchConditions },
                ],
              },
            },
            {
              $group: {
                _id: "$country",
                averageIntensity: { $avg: "$intensity" },
                averageLikelihood: { $avg: { $toInt: "$likelihood" } }, // Ensure likelihood is treated as an integer
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                country: "$_id",
                averageIntensity: 1,
                averageLikelihood: 1,
              },
            },
            {
              $limit: dLimit,
            },
            {
              $addFields: {
                lable:
                  "Insights into Intensity & Likelihood in Different Countries",
              },
            },
          ],
          sidebar_sector: [
            {
              $match: {
                sector: { $ne: "" },
              },
            },

            {
              $group: {
                _id: "$sector",
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],
          sidebar_end_year: [
            {
              $match: {
                end_year: { $ne: "" },
              },
            },

            {
              $group: {
                _id: "$end_year",
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],
          sidebar_region: [
            {
              $match: {
                region: { $ne: "" },
              },
            },

            {
              $group: {
                _id: "$region",
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],
          sidebar_topic: [
            {
              $match: {
                topic: { $ne: "" },
              },
            },

            {
              $group: {
                _id: "$topic",
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],
          sidebar_pestle: [
            {
              $match: {
                pestle: { $ne: "" },
              },
            },

            {
              $group: {
                _id: "$pestle",
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],
          test: [
            {
              $match: {
                end_year: { $ne: "" },
              },
            },
            {
              $project: {
                _id: 0,
                end_year: 1,
              },
            },
          ],
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: data,
    });
  } catch (error) {
    console.log(error);
  }
};
