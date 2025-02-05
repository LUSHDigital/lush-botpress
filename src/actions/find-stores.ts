import { gql } from "graphql-request";
import type { Implementation, VectorizeResponse } from "../misc/types";

const query = gql`
	query StoreDetailsByLocation($location: String!, $channel: StoresChannelEnum!, $radius: Int) {
		storeDetailsByLocation(location: $location, channel: $channel, radius: $radius) {
			id
			name
			address {
				streetAddress1
				streetAddress2
				city
				region
				postalCode
			}
			distance {
				distanceMiles
				distanceKilometers
			}
			closed
			description
			emails
			hours {
				friday {
					end
					start
				}
				monday {
					start
					end
				}
				tuesday {
					start
					end
				}
				wednesday {
					start
					end
				}
				thursday {
					start
					end
				}
				saturday {
					start
					end
				}
				sunday {
					start
					end
				}
				holidayHours {
					date
					isClosed
					hours {
						start
						end
					}
				}
				reopenDate
			}
			phone
			services
			specialties
			images {
				alternateText
				url
			}
		}
	}
`;

function getChannel(channel: string) {
	// TODO mena
	switch (channel.toLowerCase()) {
		case "gb":
			return "uk";
		default:
			return channel.toLowerCase();
	}
}

export const findStores: Implementation["actions"]["findStores"] = async ({
	input,
	logger,
	ctx,
}) => {
	try {
		if (!ctx.configuration.wyvernURL) {
			logger.forBot().warn("Wyvern configuration is not set");

			return;
		}

		logger.forBot().debug("findStore[input]", input);

		const variables = {
			location: input.location,
			radius: input.radius,
			channel: getChannel(input.channel),
			limit: input.limit,
		};

		const req = await fetch(ctx.configuration.wyvernURL, {
			method: "POST",
			body: JSON.stringify({ query, variables }),
			headers: { "Content-Type": "application/json" },
		});

		const res = (await req.json()) as VectorizeResponse;

		logger
			.forBot()
			.debug(
				"findStores[res.data.storeDetailsByLocation]",
				JSON.stringify(res.data.storeDetailsByLocation),
			);

		return {
			stores: res.data.storeDetailsByLocation.map((match) =>
				JSON.stringify(match),
			),
		};
	} catch (error) {
		logger.forBot().error("general uncaught error", error);
		return {};
	}
};
