import { gql } from "graphql-request";

export default gql`
    query SearchQuery($language: String!, $channel: String!, $client: String!, $contentTypes: [SearchResultContentType!]!, $perPage: Int, $query: String) {
        searchQuery(language: $language, channel: $channel, client: $client, contentTypes: $contentTypes, perPage: $perPage, query: $query) {
            items{
                content {
                    ...on ProductPayload {
                        id
                        reviews {
                            items {
                                rating {
                                    overall
                                    quality
                                    value
                                }
                                isRecommended
                                language
                                submissionDate
                                text
                                title
                                wouldBuyAgain
                                user {
                                    nickname
                                    location
                                }
                                isRatingsOnly
                                isFeatured
                                feedback {
                                    total
                                    positive
                                    negative
                                }
                            }
                            rating {
                                value
                                quality
                                overall
                            }
                        }
                    }
                }
            }
        }
    }
`;