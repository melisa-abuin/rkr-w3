/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: https://rkrapi-801419031002.us-east1.run.app/swagger/v1/swagger.json
 * Generated: 2026-07-11T07:55:21.558Z
 *
 * Run `yarn generate:api-types` to regenerate.
 */
export interface paths {
    "/api/Awards/reference": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["AwardDTO"][];
                        "application/json": components["schemas"]["AwardDTO"][];
                        "text/json": components["schemas"]["AwardDTO"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Awards/reference/{category}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    category: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["AwardDTO"][];
                        "application/json": components["schemas"]["AwardDTO"][];
                        "text/json": components["schemas"]["AwardDTO"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Awards/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerAwardDTO"][];
                        "application/json": components["schemas"]["PlayerAwardDTO"][];
                        "text/json": components["schemas"]["PlayerAwardDTO"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Awards/{playerId}/{category}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                    category: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerAwardDTO"][];
                        "application/json": components["schemas"]["PlayerAwardDTO"][];
                        "text/json": components["schemas"]["PlayerAwardDTO"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Awards/upsert": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["PlayerAwardUpsertDTO"];
                    "text/json": components["schemas"]["PlayerAwardUpsertDTO"];
                    "application/*+json": components["schemas"]["PlayerAwardUpsertDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerAwardDTO"];
                        "application/json": components["schemas"]["PlayerAwardDTO"];
                        "text/json": components["schemas"]["PlayerAwardDTO"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Awards/batch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["PlayerAwardsBatchDTO"];
                    "text/json": components["schemas"]["PlayerAwardsBatchDTO"];
                    "application/*+json": components["schemas"]["PlayerAwardsBatchDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Awards/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["AwardStatsDTO"][];
                        "application/json": components["schemas"]["AwardStatsDTO"][];
                        "text/json": components["schemas"]["AwardStatsDTO"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/BestGameTimes/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/BestGameTimes/{playerId}/{difficulty}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                    difficulty: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/BestGameTimes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["BestGameTimeDTO"];
                    "text/json": components["schemas"]["BestGameTimeDTO"];
                    "application/*+json": components["schemas"]["BestGameTimeDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/BestGameTimes/{id}/deactivate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        trace?: never;
    };
    "/api/BestGameTimes/{id}/activate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        trace?: never;
    };
    "/api/BestGameTimes/top": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    difficulty?: string;
                    count?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Friends/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerFriendDTO"][];
                        "application/json": components["schemas"]["PlayerFriendDTO"][];
                        "text/json": components["schemas"]["PlayerFriendDTO"][];
                    };
                };
            };
        };
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["PlayerFriendDTO"][];
                    "text/json": components["schemas"]["PlayerFriendDTO"][];
                    "application/*+json": components["schemas"]["PlayerFriendDTO"][];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerFriendDTO"][];
                        "application/json": components["schemas"]["PlayerFriendDTO"][];
                        "text/json": components["schemas"]["PlayerFriendDTO"][];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/GameStats/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["GameStatsDTO"];
                        "application/json": components["schemas"]["GameStatsDTO"];
                        "text/json": components["schemas"]["GameStatsDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/GameStats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["GameStatsDTO"];
                    "text/json": components["schemas"]["GameStatsDTO"];
                    "application/*+json": components["schemas"]["GameStatsDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["GameStatsDTO"];
                        "application/json": components["schemas"]["GameStatsDTO"];
                        "text/json": components["schemas"]["GameStatsDTO"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Kibble/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Kibble": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["PlayerKibbleDTO"];
                    "text/json": components["schemas"]["PlayerKibbleDTO"];
                    "application/*+json": components["schemas"]["PlayerKibbleDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/League/seasons": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["LeagueSeasonDTO"][];
                        "application/json": components["schemas"]["LeagueSeasonDTO"][];
                        "text/json": components["schemas"]["LeagueSeasonDTO"][];
                    };
                };
            };
        };
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["LeagueSeasonDTO"];
                    "text/json": components["schemas"]["LeagueSeasonDTO"];
                    "application/*+json": components["schemas"]["LeagueSeasonDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/League/seasons/{seasonId}/players": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    seasonId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["LeaguePlayerDTO"][];
                        "application/json": components["schemas"]["LeaguePlayerDTO"][];
                        "text/json": components["schemas"]["LeaguePlayerDTO"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/League/seasons/{seasonId}/players/{battletag}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    seasonId: number;
                    battletag: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["LeaguePlayerDTO"];
                        "application/json": components["schemas"]["LeaguePlayerDTO"];
                        "text/json": components["schemas"]["LeaguePlayerDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/League/seasons/{seasonId}/leaderboard": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    difficulty?: string;
                };
                header?: never;
                path: {
                    seasonId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["LeaderboardResponseDTO"];
                        "application/json": components["schemas"]["LeaderboardResponseDTO"];
                        "text/json": components["schemas"]["LeaderboardResponseDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/League/seasons/{seasonId}/scoreboard": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    seasonId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["LeagueScoreboardEntryDTO"][];
                        "application/json": components["schemas"]["LeagueScoreboardEntryDTO"][];
                        "text/json": components["schemas"]["LeagueScoreboardEntryDTO"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/PersonalBests/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerPersonalBestsDTO"];
                        "application/json": components["schemas"]["PlayerPersonalBestsDTO"];
                        "text/json": components["schemas"]["PlayerPersonalBestsDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/PersonalBests": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["PlayerPersonalBestsDTO"];
                    "text/json": components["schemas"]["PlayerPersonalBestsDTO"];
                    "application/*+json": components["schemas"]["PlayerPersonalBestsDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerPersonalBestsDTO"];
                        "application/json": components["schemas"]["PlayerPersonalBestsDTO"];
                        "text/json": components["schemas"]["PlayerPersonalBestsDTO"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/PlayerColor/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/PlayerColor": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["PlayerColorDTO"];
                    "text/json": components["schemas"]["PlayerColorDTO"];
                    "application/*+json": components["schemas"]["PlayerColorDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Players": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["Players"][];
                        "application/json": components["schemas"]["Players"][];
                        "text/json": components["schemas"]["Players"][];
                    };
                };
            };
        };
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["CreatePlayerDTO"];
                    "text/json": components["schemas"]["CreatePlayerDTO"];
                    "application/*+json": components["schemas"]["CreatePlayerDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Players/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["Players"];
                        "application/json": components["schemas"]["Players"];
                        "text/json": components["schemas"]["Players"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Players/battletag/{battletag}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    battletag: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["Players"];
                        "application/json": components["schemas"]["Players"];
                        "text/json": components["schemas"]["Players"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Players/featured": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["FeaturedPlayersResponse"];
                        "application/json": components["schemas"]["FeaturedPlayersResponse"];
                        "text/json": components["schemas"]["FeaturedPlayersResponse"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Players/summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    battletag?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerSummaryDTO"][];
                        "application/json": components["schemas"]["PlayerSummaryDTO"][];
                        "text/json": components["schemas"]["PlayerSummaryDTO"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Players/leaderboard": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["LeaderboardResponseDTO"];
                        "application/json": components["schemas"]["LeaderboardResponseDTO"];
                        "text/json": components["schemas"]["LeaderboardResponseDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Players/timeleaderboard": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    difficulty?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TimeLeaderboardCategoryDTO"][];
                        "application/json": components["schemas"]["TimeLeaderboardCategoryDTO"][];
                        "text/json": components["schemas"]["TimeLeaderboardCategoryDTO"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Players/{battleTag}/tops": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    battleTag: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerRanksDTO"];
                        "application/json": components["schemas"]["PlayerRanksDTO"];
                        "text/json": components["schemas"]["PlayerRanksDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Players/{battleTag}/roundtimes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    battleTag: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/PlayerStats/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    battleTag?: string;
                    sortKey?: string;
                    sortOrder?: string;
                    page?: number;
                    pageSize?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["StatsRowDTOPagedResponseDTO"];
                        "application/json": components["schemas"]["StatsRowDTOPagedResponseDTO"];
                        "text/json": components["schemas"]["StatsRowDTOPagedResponseDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/PlayerStats/times": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    battleTag?: string;
                    sortKey?: string;
                    sortOrder?: string;
                    page?: number;
                    pageSize?: number;
                    difficulty?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TimesRowDTOPagedResponseDTO"];
                        "application/json": components["schemas"]["TimesRowDTOPagedResponseDTO"];
                        "text/json": components["schemas"]["TimesRowDTOPagedResponseDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/PlayerStats/kibble": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    battleTag?: string;
                    sortKey?: string;
                    sortOrder?: string;
                    page?: number;
                    pageSize?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["KibbleStatsRowDTOPagedResponseDTO"];
                        "application/json": components["schemas"]["KibbleStatsRowDTOPagedResponseDTO"];
                        "text/json": components["schemas"]["KibbleStatsRowDTOPagedResponseDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/PlayerStats/kibbleleaderboard": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["KibbleLeaderboardRowDTO"][];
                        "application/json": components["schemas"]["KibbleLeaderboardRowDTO"][];
                        "text/json": components["schemas"]["KibbleLeaderboardRowDTO"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/PlayerStats/fastestbesties/{battleTag}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    battleTag: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["FastestBestiesDTO"];
                        "application/json": components["schemas"]["FastestBestiesDTO"];
                        "text/json": components["schemas"]["FastestBestiesDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/RawJson/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerJson"];
                        "application/json": components["schemas"]["PlayerJson"];
                        "text/json": components["schemas"]["PlayerJson"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/RawJson": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["RawJsonDTO"];
                    "text/json": components["schemas"]["RawJsonDTO"];
                    "application/*+json": components["schemas"]["RawJsonDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerJson"];
                        "application/json": components["schemas"]["PlayerJson"];
                        "text/json": components["schemas"]["PlayerJson"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/RoundTimes/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerRoundTimesDTO"];
                        "application/json": components["schemas"]["PlayerRoundTimesDTO"];
                        "text/json": components["schemas"]["PlayerRoundTimesDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/RoundTimes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["PlayerRoundTimesDTO"];
                    "text/json": components["schemas"]["PlayerRoundTimesDTO"];
                    "application/*+json": components["schemas"]["PlayerRoundTimesDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerRoundTimesDTO"];
                        "application/json": components["schemas"]["PlayerRoundTimesDTO"];
                        "text/json": components["schemas"]["PlayerRoundTimesDTO"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/SelectedData/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerSelectedDataDTO"];
                        "application/json": components["schemas"]["PlayerSelectedDataDTO"];
                        "text/json": components["schemas"]["PlayerSelectedDataDTO"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/SelectedData": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["PlayerSelectedDataDTO"];
                    "text/json": components["schemas"]["PlayerSelectedDataDTO"];
                    "application/*+json": components["schemas"]["PlayerSelectedDataDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["PlayerSelectedDataDTO"];
                        "application/json": components["schemas"]["PlayerSelectedDataDTO"];
                        "text/json": components["schemas"]["PlayerSelectedDataDTO"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tournaments/{playerId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TournamentSession"][];
                        "application/json": components["schemas"]["TournamentSession"][];
                        "text/json": components["schemas"]["TournamentSession"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tournaments/{playerId}/latest": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    playerId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TournamentSession"];
                        "application/json": components["schemas"]["TournamentSession"];
                        "text/json": components["schemas"]["TournamentSession"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tournaments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["TournamentSessionDTO"];
                    "text/json": components["schemas"]["TournamentSessionDTO"];
                    "application/*+json": components["schemas"]["TournamentSessionDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TournamentSession"];
                        "application/json": components["schemas"]["TournamentSession"];
                        "text/json": components["schemas"]["TournamentSession"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tournaments/full": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tournaments/{id}/full": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/TournamentGroup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TournamentGroup"][];
                        "application/json": components["schemas"]["TournamentGroup"][];
                        "text/json": components["schemas"]["TournamentGroup"][];
                    };
                };
            };
        };
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["CreateTournamentGroupDTO"];
                    "text/json": components["schemas"]["CreateTournamentGroupDTO"];
                    "application/*+json": components["schemas"]["CreateTournamentGroupDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TournamentGroup"];
                        "application/json": components["schemas"]["TournamentGroup"];
                        "text/json": components["schemas"]["TournamentGroup"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/TournamentGroup/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TournamentGroup"];
                        "application/json": components["schemas"]["TournamentGroup"];
                        "text/json": components["schemas"]["TournamentGroup"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/TournamentGroup/{id}/merge": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["MergeSessionsDTO"];
                    "text/json": components["schemas"]["MergeSessionsDTO"];
                    "application/*+json": components["schemas"]["MergeSessionsDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TournamentGroup"];
                        "application/json": components["schemas"]["TournamentGroup"];
                        "text/json": components["schemas"]["TournamentGroup"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/TournamentGroup/{id}/session/{sessionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                    sessionId: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TournamentSession"];
                        "application/json": components["schemas"]["TournamentSession"];
                        "text/json": components["schemas"]["TournamentSession"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/TournamentGroup/{id}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["UpdateTournamentGroupStatusDTO"];
                    "text/json": components["schemas"]["UpdateTournamentGroupStatusDTO"];
                    "application/*+json": components["schemas"]["UpdateTournamentGroupStatusDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["TournamentGroup"];
                        "application/json": components["schemas"]["TournamentGroup"];
                        "text/json": components["schemas"]["TournamentGroup"];
                    };
                };
            };
        };
        trace?: never;
    };
    "/api/Upload": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["UploadAllDTO"];
                    "text/json": components["schemas"]["UploadAllDTO"];
                    "application/*+json": components["schemas"]["UploadAllDTO"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/Upload/bulk": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        [key: string]: components["schemas"]["UploadAllDTO"];
                    };
                    "text/json": {
                        [key: string]: components["schemas"]["UploadAllDTO"];
                    };
                    "application/*+json": {
                        [key: string]: components["schemas"]["UploadAllDTO"];
                    };
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Award: {
            /** Format: int32 */
            id?: number;
            key?: string | null;
            category?: string | null;
            displayName?: string | null;
            description?: string | null;
            rowStatusFlag?: string | null;
            playerAwards?: components["schemas"]["PlayerAward"][] | null;
        };
        AwardDTO: {
            key?: string | null;
            category?: string | null;
            displayName?: string | null;
            description?: string | null;
        };
        AwardStatsDTO: {
            key?: string | null;
            category?: string | null;
            displayName?: string | null;
            description?: string | null;
            /** Format: double */
            percentage?: number;
        };
        AwardStatusDTO: {
            awardKey?: string | null;
            /** Format: int32 */
            status?: number;
        };
        BattleTagDTO: {
            name?: string | null;
            tag?: string | null;
        };
        BestGameTimeDTO: {
            /** Format: int32 */
            playerId?: number;
            difficulty?: string | null;
            date?: string | null;
            /** Format: double */
            roundOneTime?: number;
            /** Format: double */
            roundTwoTime?: number;
            /** Format: double */
            roundThreeTime?: number;
            /** Format: double */
            roundFourTime?: number;
            /** Format: double */
            roundFiveTime?: number;
            teamMembers?: string | null;
            /** Format: double */
            time?: number;
        };
        BestGameTimeSummaryDTO: {
            difficulty?: string | null;
            /** Format: double */
            time?: number;
            /** Format: double */
            roundOneTime?: number;
            /** Format: double */
            roundTwoTime?: number;
            /** Format: double */
            roundThreeTime?: number;
            /** Format: double */
            roundFourTime?: number;
            /** Format: double */
            roundFiveTime?: number;
            teamMembers?: string | null;
            date?: string | null;
        };
        BestGameTimesPayloadDTO: {
            hardGameTime?: components["schemas"]["GameTimePayloadDTO"];
            impossibleGameTime?: components["schemas"]["GameTimePayloadDTO"];
            nightmareGameTime?: components["schemas"]["GameTimePayloadDTO"];
            normalGameTime?: components["schemas"]["GameTimePayloadDTO"];
            progressiveGameTime?: components["schemas"]["GameTimePayloadDTO"];
        };
        BestTimeDTO: {
            /** Format: double */
            time?: number;
            difficulty?: string | null;
        };
        ChallengesDTO: {
            general?: number[] | null;
            tournament?: number[] | null;
        };
        ColorUsageDTO: {
            color?: string | null;
            /** Format: int32 */
            count?: number;
        };
        CreatePlayerDTO: {
            battleTag?: string | null;
            lastPlayed?: string | null;
            version?: string | null;
        };
        CreateTournamentGroupDTO: {
            name?: string | null;
            gameType?: string | null;
            gamemode?: string | null;
        };
        FastestBestiesDTO: {
            once?: string[] | null;
            twice?: string[] | null;
            threeOrMore?: string[] | null;
        };
        FastestGamesRanksDTO: {
            /** Format: int32 */
            normal?: number;
            /** Format: int32 */
            hard?: number;
            /** Format: int32 */
            impossible?: number;
        };
        FeaturedChallengeDTO: {
            awardKey?: string | null;
            awardName?: string | null;
            /** Format: double */
            completionPercentage?: number;
        };
        FeaturedPlayerDTO: {
            battleTag?: string | null;
            selectedSkin?: string | null;
            /** Format: double */
            fastestTime?: number;
        };
        FeaturedPlayersResponse: {
            players?: components["schemas"]["FeaturedPlayerDTO"][] | null;
            challenges?: components["schemas"]["FeaturedChallengeDTO"][] | null;
        };
        FriendsDataPayloadDTO: {
            friendsPlayedWith?: string | null;
        };
        GameStatsDTO: {
            /** Format: int32 */
            playerId?: number;
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            hardGames?: number;
            /** Format: int32 */
            hardWins?: number;
            /** Format: int32 */
            highestSaveStreak?: number;
            /** Format: int32 */
            highestWinStreak?: number;
            /** Format: int32 */
            impossibleGames?: number;
            /** Format: int32 */
            impossibleWins?: number;
            /** Format: int32 */
            nightmareGames?: number;
            /** Format: int32 */
            nightmareWins?: number;
            /** Format: int32 */
            nitrosObtained?: number;
            /** Format: int32 */
            normalGames?: number;
            /** Format: int32 */
            normalWins?: number;
            /** Format: int32 */
            progressiveGames?: number;
            /** Format: int32 */
            progressiveWins?: number;
            /** Format: int32 */
            saveStreak?: number;
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            winStreak?: number;
        };
        GameStatsPayloadDTO: {
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            hardGames?: number;
            /** Format: int32 */
            hardWins?: number;
            /** Format: int32 */
            highestSaveStreak?: number;
            /** Format: int32 */
            highestWinStreak?: number;
            /** Format: int32 */
            impossibleGames?: number;
            /** Format: int32 */
            impossibleWins?: number;
            /** Format: int32 */
            nightmareGames?: number;
            /** Format: int32 */
            nightmareWins?: number;
            /** Format: int32 */
            nitrosObtained?: number;
            /** Format: int32 */
            deathlessObtained?: number;
            /** Format: int32 */
            normalGames?: number;
            /** Format: int32 */
            normalWins?: number;
            /** Format: int32 */
            progressiveGames?: number;
            /** Format: int32 */
            progressiveWins?: number;
            /** Format: int32 */
            saveStreak?: number;
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            winStreak?: number;
        };
        GameTimePayloadDTO: {
            date?: string | null;
            /** Format: double */
            roundOneTime?: number;
            /** Format: double */
            roundTwoTime?: number;
            /** Format: double */
            roundThreeTime?: number;
            /** Format: double */
            roundFourTime?: number;
            /** Format: double */
            roundFiveTime?: number;
            teamMembers?: string | null;
            /** Format: double */
            time?: number;
        };
        KibbleCurrencyPayloadDTO: {
            /** Format: int32 */
            collected?: number;
            /** Format: int32 */
            jackpots?: number;
            /** Format: int32 */
            superJackpots?: number;
        };
        KibbleLeaderboardRowDTO: {
            battleTag?: components["schemas"]["BattleTagDTO"];
            skins?: components["schemas"]["SkinsDTO"];
            kibbles?: components["schemas"]["KibblesDTO"];
        };
        KibbleStatsRowDTO: {
            battleTag?: components["schemas"]["BattleTagDTO"];
            kibbles?: components["schemas"]["KibblesDTO"];
        };
        KibbleStatsRowDTOPagedResponseDTO: {
            /** Format: int32 */
            pages?: number;
            stats?: components["schemas"]["KibbleStatsRowDTO"][] | null;
        };
        KibblesDTO: {
            /** Format: int32 */
            allTime?: number;
            /** Format: int32 */
            jackpots?: number;
            /** Format: int32 */
            superJackpots?: number;
            /** Format: int32 */
            singleGame?: number;
        };
        LeaderboardResponseDTO: {
            stats?: components["schemas"]["StatLeaderboardCategoryDTO"][] | null;
            times?: components["schemas"]["TimeLeaderboardCategoryDTO"][] | null;
        };
        LeagueBestGameTime: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            /** Format: int32 */
            leagueSeasonId?: number;
            leagueSeason?: components["schemas"]["LeagueSeasons"];
            difficulty?: string | null;
            date?: string | null;
            /** Format: double */
            roundOneTime?: number;
            /** Format: double */
            roundTwoTime?: number;
            /** Format: double */
            roundThreeTime?: number;
            /** Format: double */
            roundFourTime?: number;
            /** Format: double */
            roundFiveTime?: number;
            teamMembers?: string | null;
            /** Format: double */
            time?: number;
            rowStatusFlag?: string | null;
        };
        LeagueBestGameTimeDTO: {
            difficulty?: string | null;
            /** Format: double */
            time?: number;
            /** Format: double */
            roundOneTime?: number;
            /** Format: double */
            roundTwoTime?: number;
            /** Format: double */
            roundThreeTime?: number;
            /** Format: double */
            roundFourTime?: number;
            /** Format: double */
            roundFiveTime?: number;
            teamMembers?: string | null;
            date?: string | null;
        };
        LeagueCurrencyPayloadDTO: {
            kibble?: components["schemas"]["KibbleCurrencyPayloadDTO"];
        };
        LeagueKibble: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            /** Format: int32 */
            leagueSeasonId?: number;
            leagueSeason?: components["schemas"]["LeagueSeasons"];
            /** Format: int32 */
            collected?: number;
            /** Format: int32 */
            jackpots?: number;
            /** Format: int32 */
            superJackpots?: number;
        };
        LeaguePlayerDTO: {
            battleTag?: string | null;
            selectedData?: components["schemas"]["PlayerSelectedDataDTO"];
            /** Format: int32 */
            seasonId?: number;
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            hardGames?: number;
            /** Format: int32 */
            hardWins?: number;
            /** Format: int32 */
            highestSaveStreak?: number;
            /** Format: int32 */
            highestWinStreak?: number;
            /** Format: int32 */
            impossibleGames?: number;
            /** Format: int32 */
            impossibleWins?: number;
            /** Format: int32 */
            kibbleCollected?: number;
            /** Format: int32 */
            kibbleJackpots?: number;
            /** Format: int32 */
            kibbleSuperJackpots?: number;
            /** Format: int32 */
            deathlessObtained?: number;
            /** Format: int32 */
            nightmareGames?: number;
            /** Format: int32 */
            nightmareWins?: number;
            /** Format: int32 */
            nitrosObtained?: number;
            /** Format: int32 */
            normalGames?: number;
            /** Format: int32 */
            normalWins?: number;
            /** Format: int32 */
            progressiveGames?: number;
            /** Format: int32 */
            progressiveWins?: number;
            /** Format: int32 */
            saveStreak?: number;
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            totalGames?: number;
            /** Format: int32 */
            winStreak?: number;
            /** Format: double */
            winRate?: number;
            /** Format: double */
            saveDeathRatio?: number;
            /** Format: double */
            leagueScore?: number;
            scoreBreakdown?: components["schemas"]["LeagueScoreBreakdownDTO"];
            roundTimes?: components["schemas"]["LeagueRoundTimesDTO"];
            bestGameTimes?: components["schemas"]["LeagueBestGameTimeDTO"][] | null;
        };
        LeagueRoundTimes: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            /** Format: int32 */
            leagueSeasonId?: number;
            leagueSeason?: components["schemas"]["LeagueSeasons"];
            /** Format: double */
            roundOneHard?: number;
            /** Format: double */
            roundTwoHard?: number;
            /** Format: double */
            roundThreeHard?: number;
            /** Format: double */
            roundFourHard?: number;
            /** Format: double */
            roundFiveHard?: number;
            /** Format: double */
            roundOneImpossible?: number;
            /** Format: double */
            roundTwoImpossible?: number;
            /** Format: double */
            roundThreeImpossible?: number;
            /** Format: double */
            roundFourImpossible?: number;
            /** Format: double */
            roundFiveImpossible?: number;
            /** Format: double */
            roundOneNightmare?: number;
            /** Format: double */
            roundTwoNightmare?: number;
            /** Format: double */
            roundThreeNightmare?: number;
            /** Format: double */
            roundFourNightmare?: number;
            /** Format: double */
            roundFiveNightmare?: number;
            /** Format: double */
            roundOneNormal?: number;
            /** Format: double */
            roundTwoNormal?: number;
            /** Format: double */
            roundThreeNormal?: number;
            /** Format: double */
            roundFourNormal?: number;
            /** Format: double */
            roundFiveNormal?: number;
            /** Format: double */
            roundOneProgressive?: number;
            /** Format: double */
            roundTwoProgressive?: number;
            /** Format: double */
            roundThreeProgressive?: number;
            /** Format: double */
            roundOneSolo?: number;
            /** Format: double */
            roundTwoSolo?: number;
            /** Format: double */
            roundThreeSolo?: number;
            /** Format: double */
            roundFourSolo?: number;
            /** Format: double */
            roundFiveSolo?: number;
        };
        LeagueRoundTimesDTO: {
            /** Format: double */
            roundOneHard?: number;
            /** Format: double */
            roundTwoHard?: number;
            /** Format: double */
            roundThreeHard?: number;
            /** Format: double */
            roundFourHard?: number;
            /** Format: double */
            roundFiveHard?: number;
            /** Format: double */
            roundOneImpossible?: number;
            /** Format: double */
            roundTwoImpossible?: number;
            /** Format: double */
            roundThreeImpossible?: number;
            /** Format: double */
            roundFourImpossible?: number;
            /** Format: double */
            roundFiveImpossible?: number;
            /** Format: double */
            roundOneNightmare?: number;
            /** Format: double */
            roundTwoNightmare?: number;
            /** Format: double */
            roundThreeNightmare?: number;
            /** Format: double */
            roundFourNightmare?: number;
            /** Format: double */
            roundFiveNightmare?: number;
            /** Format: double */
            roundOneNormal?: number;
            /** Format: double */
            roundTwoNormal?: number;
            /** Format: double */
            roundThreeNormal?: number;
            /** Format: double */
            roundFourNormal?: number;
            /** Format: double */
            roundFiveNormal?: number;
            /** Format: double */
            roundOneProgressive?: number;
            /** Format: double */
            roundTwoProgressive?: number;
            /** Format: double */
            roundThreeProgressive?: number;
            /** Format: double */
            roundOneSolo?: number;
            /** Format: double */
            roundTwoSolo?: number;
            /** Format: double */
            roundThreeSolo?: number;
            /** Format: double */
            roundFourSolo?: number;
            /** Format: double */
            roundFiveSolo?: number;
        };
        LeagueScoreBreakdownDTO: {
            /** Format: double */
            weightedWins?: number;
            /** Format: double */
            weightedLosses?: number;
            /** Format: double */
            saveRatio?: number;
            /** Format: double */
            nitroScore?: number;
            /** Format: double */
            streakBonus?: number;
            /** Format: double */
            deathlessBonus?: number;
            /** Format: double */
            kibbleBonus?: number;
            /** Format: double */
            gameSpeedBonus?: number;
            /** Format: double */
            roundSpeedBonus?: number;
            /** Format: double */
            totalScore?: number;
        };
        LeagueScoreboardEntryDTO: {
            /** Format: int32 */
            rank?: number;
            player?: components["schemas"]["BattleTagDTO"];
            /** Format: double */
            leagueScore?: number;
            breakdown?: components["schemas"]["LeagueScoreBreakdownDTO"];
            selectedData?: components["schemas"]["PlayerSelectedDataDTO"];
        };
        LeagueSeasonDTO: {
            /** Format: int32 */
            id?: number;
            leagueId?: string | null;
            description?: string | null;
            /** Format: date-time */
            startDate?: string;
            /** Format: date-time */
            endDate?: string;
        };
        LeagueSeasonDataPayloadDTO: {
            seasonID?: string | null;
            stats?: components["schemas"]["LeagueStatsPayloadDTO"];
            currency?: components["schemas"]["LeagueCurrencyPayloadDTO"];
            roundTimes?: components["schemas"]["RoundTimesPayloadDTO"];
            gameTimes?: components["schemas"]["BestGameTimesPayloadDTO"];
        };
        LeagueSeasons: {
            /** Format: int32 */
            id?: number;
            leagueId?: string | null;
            description?: string | null;
            /** Format: date-time */
            startDate?: string;
            /** Format: date-time */
            endDate?: string;
            rowStatusFlag?: string | null;
            leagueStats?: components["schemas"]["LeagueStats"][] | null;
            leagueRoundTimes?: components["schemas"]["LeagueRoundTimes"][] | null;
            leagueBestGameTimes?: components["schemas"]["LeagueBestGameTime"][] | null;
            leagueKibble?: components["schemas"]["LeagueKibble"][] | null;
        };
        LeagueStats: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            /** Format: int32 */
            leagueSeasonId?: number;
            leagueSeason?: components["schemas"]["LeagueSeasons"];
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            hardGames?: number;
            /** Format: int32 */
            hardWins?: number;
            /** Format: int32 */
            highestSaveStreak?: number;
            /** Format: int32 */
            highestWinStreak?: number;
            /** Format: int32 */
            impossibleGames?: number;
            /** Format: int32 */
            impossibleWins?: number;
            /** Format: int32 */
            nightmareGames?: number;
            /** Format: int32 */
            nightmareWins?: number;
            /** Format: int32 */
            nitrosObtained?: number;
            /** Format: int32 */
            deathlessObtained?: number;
            /** Format: int32 */
            normalGames?: number;
            /** Format: int32 */
            normalWins?: number;
            /** Format: int32 */
            progressiveGames?: number;
            /** Format: int32 */
            progressiveWins?: number;
            /** Format: int32 */
            saveStreak?: number;
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            totalGames?: number;
            /** Format: int32 */
            winStreak?: number;
        };
        LeagueStatsPayloadDTO: {
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            hardGames?: number;
            /** Format: int32 */
            hardWins?: number;
            /** Format: int32 */
            highestSaveStreak?: number;
            /** Format: int32 */
            highestWinStreak?: number;
            /** Format: int32 */
            impossibleGames?: number;
            /** Format: int32 */
            impossibleWins?: number;
            /** Format: int32 */
            nightmareGames?: number;
            /** Format: int32 */
            nightmareWins?: number;
            /** Format: int32 */
            nitrosObtained?: number;
            /** Format: int32 */
            normalGames?: number;
            /** Format: int32 */
            normalWins?: number;
            /** Format: int32 */
            progressiveGames?: number;
            /** Format: int32 */
            progressiveWins?: number;
            /** Format: int32 */
            saveStreak?: number;
            /** Format: int32 */
            deathlessObtained?: number;
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            totalGames?: number;
            /** Format: int32 */
            winStreak?: number;
        };
        MergeSessionsDTO: {
            sessionIds?: number[] | null;
        };
        PersonalBestsPayloadDTO: {
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            kibbleCollected?: number;
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            score?: number;
        };
        PlayerAward: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            /** Format: int32 */
            awardId?: number;
            award?: components["schemas"]["Award"];
            /** Format: int32 */
            status?: number;
        };
        PlayerAwardDTO: {
            /** Format: int32 */
            playerId?: number;
            awardKey?: string | null;
            category?: string | null;
            displayName?: string | null;
            description?: string | null;
            /** Format: int32 */
            status?: number;
        };
        PlayerAwardSummaryDTO: {
            key?: string | null;
            category?: string | null;
            /** Format: int32 */
            status?: number;
            displayName?: string | null;
            description?: string | null;
        };
        PlayerAwardUpsertDTO: {
            /** Format: int32 */
            playerId?: number;
            awardKey?: string | null;
            /** Format: int32 */
            status?: number;
        };
        PlayerAwardsBatchDTO: {
            /** Format: int32 */
            playerId?: number;
            awards?: components["schemas"]["AwardStatusDTO"][] | null;
        };
        PlayerBestGameTime: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            difficulty?: string | null;
            date?: string | null;
            /** Format: double */
            roundOneTime?: number;
            /** Format: double */
            roundTwoTime?: number;
            /** Format: double */
            roundThreeTime?: number;
            /** Format: double */
            roundFourTime?: number;
            /** Format: double */
            roundFiveTime?: number;
            teamMembers?: string | null;
            /** Format: double */
            time?: number;
            rowStatusFlag?: string | null;
        };
        PlayerColor: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            lastPlayedColor?: string | null;
            mostPlayedColor?: string | null;
            vortexColor?: string | null;
            playedColors?: components["schemas"]["PlayerColorUsage"][] | null;
        };
        PlayerColorDTO: {
            /** Format: int32 */
            playerId?: number;
            lastPlayedColor?: string | null;
            mostPlayedColor?: string | null;
            vortexColor?: string | null;
            playedColors?: components["schemas"]["ColorUsageDTO"][] | null;
        };
        PlayerColorDataPayloadDTO: {
            lastPlayedColor?: string | null;
            mostPlayedColor?: string | null;
            playedColors?: string | null;
            vortexColor?: string | null;
        };
        PlayerColorUsage: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerColorId?: number;
            playerColor?: components["schemas"]["PlayerColor"];
            color?: string | null;
            /** Format: int32 */
            count?: number;
        };
        PlayerFriend: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            friendName?: string | null;
            /** Format: int32 */
            gamesPlayed?: number;
        };
        PlayerFriendDTO: {
            friendName?: string | null;
            /** Format: int32 */
            gamesPlayed?: number;
        };
        PlayerGameStats: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            hardGames?: number;
            /** Format: int32 */
            hardWins?: number;
            /** Format: int32 */
            highestSaveStreak?: number;
            /** Format: int32 */
            highestWinStreak?: number;
            /** Format: int32 */
            impossibleGames?: number;
            /** Format: int32 */
            impossibleWins?: number;
            /** Format: int32 */
            nightmareGames?: number;
            /** Format: int32 */
            nightmareWins?: number;
            /** Format: int32 */
            nitrosObtained?: number;
            /** Format: int32 */
            deathlessObtained?: number;
            /** Format: int32 */
            normalGames?: number;
            /** Format: int32 */
            normalWins?: number;
            /** Format: int32 */
            progressiveGames?: number;
            /** Format: int32 */
            progressiveWins?: number;
            /** Format: int32 */
            saveStreak?: number;
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            winStreak?: number;
        };
        PlayerJson: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            /** Format: date-time */
            uploaded_At?: string;
            raw_Json?: unknown;
        };
        PlayerKibble: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            /** Format: int32 */
            collected?: number;
            /** Format: int32 */
            jackpots?: number;
            /** Format: int32 */
            superJackpots?: number;
        };
        PlayerKibbleDTO: {
            /** Format: int32 */
            playerId?: number;
            /** Format: int32 */
            collected?: number;
            /** Format: int32 */
            jackpots?: number;
            /** Format: int32 */
            superJackpots?: number;
        };
        PlayerPersonalBests: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            kibbleCollected?: number;
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            score?: number;
        };
        PlayerPersonalBestsDTO: {
            /** Format: int32 */
            playerId?: number;
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            kibbleCollected?: number;
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            score?: number;
        };
        PlayerRanksDTO: {
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            wins?: number;
            /** Format: int32 */
            highestWinStreak?: number;
            /** Format: int32 */
            gamesPlayed?: number;
            /** Format: int32 */
            saveDeathRatio?: number;
            /** Format: int32 */
            kibbles?: number;
            roundOne?: components["schemas"]["RoundRanksDTO"];
            roundTwo?: components["schemas"]["RoundRanksDTO"];
            roundThree?: components["schemas"]["RoundRanksDTO"];
            roundFour?: components["schemas"]["RoundRanksDTO"];
            roundFive?: components["schemas"]["RoundRanksDTO"];
            fastestGames?: components["schemas"]["FastestGamesRanksDTO"];
        };
        PlayerRoundTimes: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            /** Format: double */
            roundOneHard?: number;
            /** Format: double */
            roundTwoHard?: number;
            /** Format: double */
            roundThreeHard?: number;
            /** Format: double */
            roundFourHard?: number;
            /** Format: double */
            roundFiveHard?: number;
            /** Format: double */
            roundOneImpossible?: number;
            /** Format: double */
            roundTwoImpossible?: number;
            /** Format: double */
            roundThreeImpossible?: number;
            /** Format: double */
            roundFourImpossible?: number;
            /** Format: double */
            roundFiveImpossible?: number;
            /** Format: double */
            roundOneNightmare?: number;
            /** Format: double */
            roundTwoNightmare?: number;
            /** Format: double */
            roundThreeNightmare?: number;
            /** Format: double */
            roundFourNightmare?: number;
            /** Format: double */
            roundFiveNightmare?: number;
            /** Format: double */
            roundOneNormal?: number;
            /** Format: double */
            roundTwoNormal?: number;
            /** Format: double */
            roundThreeNormal?: number;
            /** Format: double */
            roundFourNormal?: number;
            /** Format: double */
            roundFiveNormal?: number;
            /** Format: double */
            roundOneProgressive?: number;
            /** Format: double */
            roundTwoProgressive?: number;
            /** Format: double */
            roundThreeProgressive?: number;
            /** Format: double */
            roundOneSolo?: number;
            /** Format: double */
            roundTwoSolo?: number;
            /** Format: double */
            roundThreeSolo?: number;
            /** Format: double */
            roundFourSolo?: number;
            /** Format: double */
            roundFiveSolo?: number;
        };
        PlayerRoundTimesDTO: {
            /** Format: int32 */
            playerId?: number;
            /** Format: double */
            roundOneHard?: number;
            /** Format: double */
            roundTwoHard?: number;
            /** Format: double */
            roundThreeHard?: number;
            /** Format: double */
            roundFourHard?: number;
            /** Format: double */
            roundFiveHard?: number;
            /** Format: double */
            roundOneImpossible?: number;
            /** Format: double */
            roundTwoImpossible?: number;
            /** Format: double */
            roundThreeImpossible?: number;
            /** Format: double */
            roundFourImpossible?: number;
            /** Format: double */
            roundFiveImpossible?: number;
            /** Format: double */
            roundOneNightmare?: number;
            /** Format: double */
            roundTwoNightmare?: number;
            /** Format: double */
            roundThreeNightmare?: number;
            /** Format: double */
            roundFourNightmare?: number;
            /** Format: double */
            roundFiveNightmare?: number;
            /** Format: double */
            roundOneNormal?: number;
            /** Format: double */
            roundTwoNormal?: number;
            /** Format: double */
            roundThreeNormal?: number;
            /** Format: double */
            roundFourNormal?: number;
            /** Format: double */
            roundFiveNormal?: number;
            /** Format: double */
            roundOneProgressive?: number;
            /** Format: double */
            roundTwoProgressive?: number;
            /** Format: double */
            roundThreeProgressive?: number;
            /** Format: double */
            roundOneSolo?: number;
            /** Format: double */
            roundTwoSolo?: number;
            /** Format: double */
            roundThreeSolo?: number;
            /** Format: double */
            roundFourSolo?: number;
            /** Format: double */
            roundFiveSolo?: number;
        };
        PlayerSelectedData: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            selectedAura?: string | null;
            selectedHat?: string | null;
            selectedSkin?: string | null;
            selectedTrail?: string | null;
            selectedWindwalk?: string | null;
            selectedWings?: string | null;
        };
        PlayerSelectedDataDTO: {
            /** Format: int32 */
            playerId?: number;
            selectedAura?: string | null;
            selectedHat?: string | null;
            selectedSkin?: string | null;
            selectedTrail?: string | null;
            selectedWindwalk?: string | null;
            selectedWings?: string | null;
        };
        PlayerSummaryDTO: {
            /** Format: int32 */
            id?: number;
            battleTag?: components["schemas"]["BattleTagDTO"];
            /** Format: date-time */
            uploadDate?: string | null;
            /** Format: date-time */
            lastPlayed?: string | null;
            version?: string | null;
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            highestSaveStreak?: number;
            /** Format: int32 */
            highestWinStreak?: number;
            /** Format: int32 */
            saveStreak?: number;
            /** Format: int32 */
            saves?: number;
            /** Format: int32 */
            winStreak?: number;
            /** Format: double */
            saveDeathRatio?: number;
            /** Format: double */
            winRate?: number;
            /** Format: int32 */
            nitrosObtained?: number;
            /** Format: int32 */
            deathlessObtained?: number;
            gamesPlayed?: components["schemas"]["TotalsDTO"];
            wins?: components["schemas"]["TotalsDTO"];
            completedChallenges?: components["schemas"]["ChallengesDTO"];
            roundOne?: components["schemas"]["SummaryRoundTimesDTO"];
            roundTwo?: components["schemas"]["SummaryRoundTimesDTO"];
            roundThree?: components["schemas"]["SummaryRoundTimesDTO"];
            roundFour?: components["schemas"]["SummaryRoundTimesDTO"];
            roundFive?: components["schemas"]["SummaryRoundTimesDTO"];
            /** Format: int32 */
            kibbleCollected?: number;
            /** Format: int32 */
            kibbleJackpots?: number;
            /** Format: int32 */
            kibbleSuperJackpots?: number;
            /** Format: int32 */
            personalBestSaves?: number;
            /** Format: int32 */
            personalBestKibbleCollected?: number;
            mostPlayedColor?: string | null;
            selectedAura?: string | null;
            selectedHat?: string | null;
            selectedSkin?: string | null;
            selectedTrail?: string | null;
            selectedWindwalk?: string | null;
            selectedWings?: string | null;
            bestGameTimes?: components["schemas"]["BestGameTimeSummaryDTO"][] | null;
            awards?: components["schemas"]["PlayerAwardSummaryDTO"][] | null;
        };
        Players: {
            /** Format: int32 */
            id?: number;
            battleTag?: string | null;
            /** Format: date-time */
            lastPlayed?: string;
            /** Format: date-time */
            uploadDate?: string;
            version?: string | null;
            rowStatusFlag?: string | null;
            gameStats?: components["schemas"]["PlayerGameStats"];
            roundTimes?: components["schemas"]["PlayerRoundTimes"];
            kibble?: components["schemas"]["PlayerKibble"];
            personalBests?: components["schemas"]["PlayerPersonalBests"];
            color?: components["schemas"]["PlayerColor"];
            selectedData?: components["schemas"]["PlayerSelectedData"];
            bestGameTimes?: components["schemas"]["PlayerBestGameTime"][] | null;
            friends?: components["schemas"]["PlayerFriend"][] | null;
            tournamentEntries?: components["schemas"]["TournamentPlayer"][] | null;
            rawJsonUploads?: components["schemas"]["PlayerJson"][] | null;
            playerAwards?: components["schemas"]["PlayerAward"][] | null;
            leagueStats?: components["schemas"]["LeagueStats"][] | null;
            leagueRoundTimes?: components["schemas"]["LeagueRoundTimes"][] | null;
            leagueBestGameTimes?: components["schemas"]["LeagueBestGameTime"][] | null;
        };
        RawJsonDTO: {
            /** Format: int32 */
            playerId?: number;
            rawJson?: string | null;
        };
        RoundRanksDTO: {
            /** Format: int32 */
            normal?: number;
            /** Format: int32 */
            hard?: number;
            /** Format: int32 */
            impossible?: number;
            /** Format: int32 */
            nightmare?: number;
        };
        RoundTimesDTO: {
            /** Format: double */
            normal?: number;
            /** Format: double */
            hard?: number;
            /** Format: double */
            impossible?: number;
            /** Format: double */
            nightmare?: number;
            /** Format: double */
            progressive?: number;
            /** Format: double */
            solo?: number;
            best?: components["schemas"]["BestTimeDTO"];
        };
        RoundTimesPayloadDTO: {
            /** Format: double */
            roundOneHard?: number;
            /** Format: double */
            roundTwoHard?: number;
            /** Format: double */
            roundThreeHard?: number;
            /** Format: double */
            roundFourHard?: number;
            /** Format: double */
            roundFiveHard?: number;
            /** Format: double */
            roundOneImpossible?: number;
            /** Format: double */
            roundTwoImpossible?: number;
            /** Format: double */
            roundThreeImpossible?: number;
            /** Format: double */
            roundFourImpossible?: number;
            /** Format: double */
            roundFiveImpossible?: number;
            /** Format: double */
            roundOneNightmare?: number;
            /** Format: double */
            roundTwoNightmare?: number;
            /** Format: double */
            roundThreeNightmare?: number;
            /** Format: double */
            roundFourNightmare?: number;
            /** Format: double */
            roundFiveNightmare?: number;
            /** Format: double */
            roundOneNormal?: number;
            /** Format: double */
            roundTwoNormal?: number;
            /** Format: double */
            roundThreeNormal?: number;
            /** Format: double */
            roundFourNormal?: number;
            /** Format: double */
            roundFiveNormal?: number;
            /** Format: double */
            roundOneProgressive?: number;
            /** Format: double */
            roundTwoProgressive?: number;
            /** Format: double */
            roundThreeProgressive?: number;
            /** Format: double */
            roundOneSolo?: number;
            /** Format: double */
            roundTwoSolo?: number;
            /** Format: double */
            roundThreeSolo?: number;
            /** Format: double */
            roundFourSolo?: number;
            /** Format: double */
            roundFiveSolo?: number;
        };
        SaveStreakDTO: {
            /** Format: int32 */
            highestScore?: number;
            redLightning?: boolean;
            patrioticTendrils?: boolean;
        };
        SelectedDataPayloadDTO: {
            selectedAura?: string | null;
            selectedHat?: string | null;
            selectedSkin?: string | null;
            selectedTrail?: string | null;
            selectedWindwalk?: string | null;
            selectedWings?: string | null;
        };
        SkinsDTO: {
            selectedAura?: string | null;
            selectedHat?: string | null;
            selectedSkin?: string | null;
            selectedTrail?: string | null;
            selectedWindwalk?: string | null;
            selectedWings?: string | null;
        };
        StatLeaderboardCategoryDTO: {
            category?: string | null;
            key?: string | null;
            data?: components["schemas"]["StatLeaderboardEntryDTO"][] | null;
        };
        StatLeaderboardEntryDTO: {
            player?: components["schemas"]["BattleTagDTO"];
            /** Format: double */
            data?: number;
        };
        StatsRowDTO: {
            battleTag?: components["schemas"]["BattleTagDTO"];
            completedChallenges?: components["schemas"]["ChallengesDTO"];
            /** Format: int32 */
            saves?: number;
            /** Format: double */
            saveDeathRatio?: number;
            gamesPlayed?: components["schemas"]["TotalsDTO"];
            wins?: components["schemas"]["TotalsDTO"];
            saveStreak?: components["schemas"]["SaveStreakDTO"];
            /** Format: int32 */
            highestWinStreak?: number;
            winRate?: string | null;
        };
        StatsRowDTOPagedResponseDTO: {
            /** Format: int32 */
            pages?: number;
            stats?: components["schemas"]["StatsRowDTO"][] | null;
        };
        SummaryRoundTimesDTO: {
            /** Format: double */
            normal?: number;
            /** Format: double */
            hard?: number;
            /** Format: double */
            impossible?: number;
            /** Format: double */
            nightmare?: number;
            /** Format: double */
            progressive?: number;
            /** Format: double */
            solo?: number;
            best?: components["schemas"]["BestTimeDTO"];
        };
        TimeDataDTO: {
            /** Format: double */
            time?: number;
            difficulty?: string | null;
        };
        TimeLeaderboardCategoryDTO: {
            category?: string | null;
            key?: string | null;
            data?: components["schemas"]["TimeLeaderboardEntryDTO"][] | null;
        };
        TimeLeaderboardEntryDTO: {
            player?: components["schemas"]["BattleTagDTO"];
            data?: components["schemas"]["TimeDataDTO"];
        };
        TimesRowDTO: {
            battleTag?: components["schemas"]["BattleTagDTO"];
            roundOne?: components["schemas"]["RoundTimesDTO"];
            roundTwo?: components["schemas"]["RoundTimesDTO"];
            roundThree?: components["schemas"]["RoundTimesDTO"];
            roundFour?: components["schemas"]["RoundTimesDTO"];
            roundFive?: components["schemas"]["RoundTimesDTO"];
        };
        TimesRowDTOPagedResponseDTO: {
            /** Format: int32 */
            pages?: number;
            stats?: components["schemas"]["TimesRowDTO"][] | null;
        };
        TotalsDTO: {
            /** Format: int32 */
            normal?: number;
            /** Format: int32 */
            hard?: number;
            /** Format: int32 */
            impossible?: number;
            /** Format: int32 */
            nightmare?: number;
            /** Format: int32 */
            progressive?: number;
            /** Format: int32 */
            total?: number;
        };
        TournamentGameDTO: {
            /** Format: int32 */
            gameNumber?: number;
            gameId?: string | null;
            team?: string | null;
            teamMembers?: string | null;
            /** Format: int32 */
            totalDeaths?: number;
            /** Format: double */
            totalProgress?: number;
            /** Format: int32 */
            totalSaves?: number;
            /** Format: double */
            totalTime?: number;
            rounds?: components["schemas"]["TournamentRoundDTO"][] | null;
        };
        TournamentGameEntry: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            tournamentSessionId?: number;
            session?: components["schemas"]["TournamentSession"];
            /** Format: int32 */
            tournamentPlayerId?: number | null;
            player?: components["schemas"]["TournamentPlayer"];
            /** Format: int32 */
            gameNumber?: number;
            gameId?: string | null;
            team?: string | null;
            teamMembers?: string | null;
            /** Format: int32 */
            totalDeaths?: number;
            /** Format: double */
            totalProgress?: number;
            /** Format: int32 */
            totalSaves?: number;
            /** Format: double */
            totalTime?: number;
            rounds?: components["schemas"]["TournamentRoundEntry"][] | null;
        };
        TournamentGroup: {
            /** Format: int32 */
            id?: number;
            name?: string | null;
            gameType?: string | null;
            gamemode?: string | null;
            status?: string | null;
            /** Format: date-time */
            createdAt?: string;
            sessions?: components["schemas"]["TournamentSession"][] | null;
        };
        /** @enum {string} */
        TournamentGroupStatus: "Open" | "Merged";
        TournamentPlayer: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            tournamentSessionId?: number;
            session?: components["schemas"]["TournamentSession"];
            /** Format: int32 */
            playerId?: number;
            player?: components["schemas"]["Players"];
            gameEntries?: components["schemas"]["TournamentGameEntry"][] | null;
        };
        TournamentRoundDTO: {
            /** Format: int32 */
            roundNumber?: number;
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            level?: number;
            /** Format: double */
            progress?: number;
            /** Format: double */
            roundTime?: number;
            /** Format: int32 */
            saves?: number;
        };
        TournamentRoundEntry: {
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            tournamentGameEntryId?: number;
            gameEntry?: components["schemas"]["TournamentGameEntry"];
            /** Format: int32 */
            roundNumber?: number;
            /** Format: int32 */
            deaths?: number;
            /** Format: int32 */
            level?: number;
            /** Format: double */
            progress?: number;
            /** Format: double */
            roundTime?: number;
            /** Format: int32 */
            saves?: number;
        };
        TournamentSession: {
            /** Format: int32 */
            id?: number;
            tournamentId?: string | null;
            /** Format: int32 */
            adminApproved?: number;
            tournamentDateTime?: string | null;
            gameType?: string | null;
            gamemode?: string | null;
            region?: string | null;
            /** Format: int32 */
            tournamentGroupId?: number | null;
            tournamentGroup?: components["schemas"]["TournamentGroup"];
            players?: components["schemas"]["TournamentPlayer"][] | null;
            games?: components["schemas"]["TournamentGameEntry"][] | null;
        };
        TournamentSessionDTO: {
            /** Format: int32 */
            playerId?: number;
            tournamentId?: string | null;
            /** Format: int32 */
            adminApproved?: number;
            tournamentDateTime?: string | null;
            gameType?: string | null;
            gamemode?: string | null;
            region?: string | null;
            games?: components["schemas"]["TournamentGameDTO"][] | null;
        };
        TournamentStatsPayloadDTO: {
            /** Format: int32 */
            adminApproved?: number;
            dateTime?: string | null;
            gameType?: string | null;
            gamemode?: string | null;
            playerName?: string | null;
            region?: string | null;
            Tournament_ID?: string | null;
        } & {
            [key: string]: unknown;
        };
        UpdateTournamentGroupStatusDTO: {
            status?: components["schemas"]["TournamentGroupStatus"];
        };
        UploadAllDTO: {
            playerName?: string | null;
            date?: string | null;
            version?: string | null;
            bestGameTimes?: components["schemas"]["BestGameTimesPayloadDTO"];
            friendsData?: components["schemas"]["FriendsDataPayloadDTO"];
            gameAwardsSorted?: {
                [key: string]: {
                    [key: string]: number;
                };
            } | null;
            gameStats?: components["schemas"]["GameStatsPayloadDTO"];
            kibbleCurrency?: components["schemas"]["KibbleCurrencyPayloadDTO"];
            personalBests?: components["schemas"]["PersonalBestsPayloadDTO"];
            playerColorData?: components["schemas"]["PlayerColorDataPayloadDTO"];
            roundTimes?: components["schemas"]["RoundTimesPayloadDTO"];
            selectedData?: components["schemas"]["SelectedDataPayloadDTO"];
            tournamentStats?: components["schemas"]["TournamentStatsPayloadDTO"];
            leagueSeasonData?: components["schemas"]["LeagueSeasonDataPayloadDTO"];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
